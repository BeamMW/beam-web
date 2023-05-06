export enum EventType {
  DownloadProgress,
  HashVerification,
  HashVerified,
}

export interface DownloadEvent {
  type: EventType;
  downloadedSize?: number;
  totalSize?: number;
  percentage?: number;
  speed?: number;
  remainingTime?: number;
}

function isValidUrl(url: string): boolean {
  try {
    const check = new URL(url);
    return typeof check.hostname === "string";
  } catch (e) {
    return false;
  }
}

function isValidHash(hash: string): boolean {
  return /^[a-fA-F0-9]{64}$/.test(hash);
}

// Accumulator for Uint8Array
class Uint8ArrayAccumulator {
  private chunks: Uint8Array[] = [];
  private totalLength = 0;

  append(chunk: Uint8Array) {
    this.chunks.push(chunk);
    this.totalLength += chunk.length;
  }

  toUint8Array(): Uint8Array {
    const result = new Uint8Array(this.totalLength);
    let offset = 0;

    for (const chunk of this.chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }

    return result;
  }
}

export function extractFilenameFromUrl(url: string): string {
  const path = new URL(url).pathname;
  return path.substring(path.lastIndexOf("/") + 1);
}

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function verifyAndSave(
  stream: ReadableStream<Uint8Array>,
  expectedHash: string,
  fileName: string
): Promise<void> {
  // Validate inputs
  if (!isValidHash(expectedHash)) {
    throw new Error("Invalid expected hash");
  }

  // Calculate the SHA256 hash while reading the stream
  const crypto = window.crypto.subtle;
  const accumulator = new Uint8ArrayAccumulator();

  const transformStream = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      accumulator.append(chunk);
      controller.enqueue(chunk);
    },
  });

  const transformedStream = stream.pipeThrough(transformStream);

  await new Response(transformedStream).arrayBuffer(); // Consume the transformed stream
  const finalArray = accumulator.toUint8Array(); // Get the final array from the accumulator
  const hashBuffer = await crypto.digest("SHA-256", finalArray);

  // Convert the hash to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const calculatedHash = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Compare the hashes
  if (calculatedHash !== expectedHash) {
    throw new Error(
      `Hash mismatch: expected ${expectedHash}, got ${calculatedHash}`
    );
  }

  // eslint-disable-next-line no-console
  console.log(
    `Hash validation success: ${expectedHash} is equal to ${calculatedHash}`
  );

  // Create a Blob and save the file
  const blob = new Blob([finalArray], { type: "application/octet-stream" });
  saveFile(blob, fileName);
}

function saveFile(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function downloadFile(
  url: string,
  expectedHash: string,
  onProgress: (event: DownloadEvent) => void,
  abortSignal: AbortSignal, // Add this line
  fileName?: string
): Promise<void> {
  // Validate inputs
  if (!isValidUrl(url)) {
    throw new Error("Invalid URL");
  }
  if (!isValidHash(expectedHash)) {
    throw new Error("Invalid hash");
  }

  // Fetch the file
  const response = await fetch(url, {
    signal: abortSignal,
    mode: "cors",
    referrerPolicy: "no-referrer",
  });

  if (!response.ok) {
    throw new Error(`Error fetching file: ${response.statusText}`);
  }

  // Get the total size of the file
  const totalSize = parseInt(response.headers.get("Content-Length") || "0", 10);

  // Get the response body as a stream and create a new stream to monitor progress
  const progressStream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const bodyStream = response.body;
      if (bodyStream === null) {
        throw new Error("Unable to read the response body");
      }

      const reader = bodyStream.getReader();
      let downloadedSize = 0;
      const startTime = performance.now();

      const createProgressEvent = (downloadedSize: number) => ({
        type: EventType.DownloadProgress,
        downloadedSize,
        totalSize,
        percentage: (downloadedSize / totalSize) * 100,
        speed: downloadedSize / ((performance.now() - startTime) / 1000),
        remainingTime:
          (totalSize - downloadedSize) /
          (downloadedSize / ((performance.now() - startTime) / 1000)),
      });

      async function read() {
        const { done, value } = await reader.read();

        if (done) {
          // Notify that the download is complete and hash verification has started
          onProgress({ type: EventType.HashVerification });
          controller.close();
          return;
        }

        if (value) {
          // Update the downloaded size and emit a progress event
          downloadedSize += value.length;
          onProgress(createProgressEvent(downloadedSize));

          // Enqueue the chunk and continue reading
          controller.enqueue(value);
          await read();
        }
      }

      await read();
    },
  });

  // Verify the SHA256 hash and save the file
  await verifyAndSave(
    progressStream,
    expectedHash,
    fileName || extractFilenameFromUrl(url)
  );
}
