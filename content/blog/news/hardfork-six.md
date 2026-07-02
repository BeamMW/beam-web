---
title: "Hard Fork Six"
description: "Beam completed an emergency hard fork to patch a subtle Bulletproofs rangeproof vulnerability that eluded multiple professional audits and AI reviews. Read the technical breakdown, our risk assessment, and the proposed lustration process for verifying supply integrity."
date: "2026-07-01"
category: "news"
tags:
  - "Hard Fork"
  - "Emergency"
---

## Context

The Beam developers were contacted on June 13th 2026 with a report about a possible vulnerability in Beam core code. As the former Beam team still proposes bounties for serious vulnerabilities, many such reports have been received lately, most of them being AI slop without any real interest. However, after careful examination and testing during the next few days, that one report proved to indeed identify a well hidden, but real and important vulnerability.

With the deep analysis done and the problem well identified, the core code was corrected in a non-public branch, and direct contact was made with the main mining pools and exchanges to ask them to upgrade to the new version, so that any further risk of exploitation of this vulnerability would be eliminated. The hard fork took place at block 3928666.

The latest corrected builds (wallets, nodes, etc.) can be downloaded from [beam.mw/downloads](https://beam.mw/downloads) or from [github.com/BeamMW/beam/releases](https://github.com/BeamMW/beam/releases) and [github.com/BeamMW/beam-ui/releases](https://github.com/BeamMW/beam-ui/releases).

## Technical details

The discovered vulnerability was in Beam’s implementation of Bulletproofs, a popular variant of rangeproofs with exponential compression (excellent for scalability). A rangeproof is the zero-knowledge cryptographic scheme which proves that the transaction output (TXO) is a well-formed Pedersen commitment, and holds a non-negative amount.

While the algebra behind Beam’s implementation was correct, there was an error in the transcript, i.e. in the order of challenge-response sequence for the challenges derived via the Fiat-Shamir heuristic. Specifically, the error was in the IPA (inner-product argument) part where the order of challenge-response was inverted: the sequence where the prover gets the challenge and then emits the LR pair should happen the other way around.

In [`ecc_bulletproof.cpp#L453`](https://github.com/BeamMW/beam/blob/ebc40098938197bea689b853a7f51fb507c843d5/core/ecc_bulletproof.cpp#L453), `CycleStart()` is where challenges are obtained.

And [`ecc_bulletproof.cpp#L463`](https://github.com/BeamMW/beam/blob/ebc40098938197bea689b853a7f51fb507c843d5/core/ecc_bulletproof.cpp#L463) is where the extracted LR are exposed.

As a result, after the very last challenge, the prover emits the last LR pair, plus the two "folded" scalars. Meaning that the LR, the EC points (group elements), are not pinned by the challenge, and could thus be modified a-posteriori to satisfy the equation. This is a serious vulnerability, as it could -in theory- be used to forge a TXO that holds a negative amount. This in turn allows to create a balanced transaction where another TXO is minted from thin air with the appropriate positive amount.

This was a very difficult vulnerability to discover, and it is worth noting that before the release of its mainnet in 2019, Beam code underwent security audits by several companies, which did not identify it:

- [Kudelski](https://kudelskisecurity.com)
- [Least Authority](https://leastauthority.com)
- [SmartDec (now Pessimistic)](https://pessimistic.io)

More recently, with the rise of AI, several AI agents were used to scan the Beam codebase for security vulnerabilities. Both Claude Opus 4.8 and ChatGPT Codex were used, and neither found anything serious over multiple runs.

Moreover, after the above vulnerability was discovered, these AI agents were asked to revisit and review the bulletproof implementation specifically. And, again, they didn't find any problem with it.

## Our assessment at the moment

The Beam developers consider that the probability of this vulnerability having been exploited is low.

Several aspects lead to this assessment:

1. The vulnerability is not obvious at all. Neither for the Beam developers, nor for the security audit companies. Modern AI agents also fail to discover it, even when asked specifically to review the Bulletproofs code. This was definitely not a "low-hanging fruit" discoverable by anyone with access to an AI agent. The person who found it made the discovery by manually analyzing the code, and specifically by checking the transcript.

2. The current low market cap of Beam makes exploiting it not justified economically. Receiving a bounty for the vulnerability disclosure makes far more sense than taking the risk of exploiting the Beam blockchain.

3. If done naively (for instance by asking an AI to create a working proof of concept, and then try using it) such an attack could leave a pattern that can be recognized. After the vulnerability was reported, the entire blockchain history was scanned, and no such pattern was identified.

4. We are aware that there was a harsh Beam coin price decline recently. We analyzed the public trading data: trading volumes, possible price discrepancies between exchanges, unusual activities, etc. We believe there is no evidence that suggests a hidden inflation exploitation.
   Prior to the price drop, the first anomaly we see is the sudden trade volume drop on MEXC (used to be the biggest exchange for Beam) on June 12th 2026. We don’t know the exact reason for this, probably a Market Maker was deactivated. Immediately after this, the Beam price started declining. Then, during the following days, there was a surge in the Beam trade volume on the NonKYC exchange. But this surge (1) albeit high for this exchange, still was much lower than normal daily volume on MEXC before the drop, (2) lasted for some period, then stopped on June 29th 2026.

   If the Beam price decline would’ve been due to hidden inflation, we’d expect to see an overall increase in market volume, not decline. The spike in trading volume on NonKYC probably indicates big holders (whales) anonymously cashing-out.

## The next steps

As said above, Beam developers consider at the moment that the probability of this vulnerability having been exploited is low. However, we cannot be 100% sure. There is objectively no guaranteed way -today- to ensure the exploit did not take place.

One considered option to confirm it didn’t, is the implementation of a "lustration" process, which would allow verifying the supply integrity at a given moment. Within this process, every unspent output of a past transaction (both Mimblewimble and Lelantus) would have to be disclosed upon its first use. Its amount and its asset type will be disclosed, but its owner would remain concealed. This disclosure would happen only once, and further transactions would then go back to the normal privacy of the Mimblewimble and Lelantus protocols.

Each node would keep track of the total disclosed amount for each asset type. And since the total supply of any asset type is not secret and can be calculated, this lustration process would allow demonstrating that the overall circulating amount doesn't exceed the expected maximum. Attempts to violate this would be prevented and flagged.

Such a process would provide a cryptographic guarantee of supply integrity, at the cost of a one-time, limited disclosure of legacy outputs. It is a trade-off between absolute assurance and the strongest possible privacy guarantees.

If and when the community chooses to do this, an additional network upgrade will be needed. Technically, such a lustration process will be seamless to the users, as the wallet would automatically attach the corresponding cryptographic proof for each legacy output being spent (which could be done by simply sending the assets to oneself).

## Conclusion

The Beam developers would like to thank [MonclairTrades](https://x.com/MonclairTrades) for the responsible disclosure of this vulnerability.

This discovery underscores the enduring value of careful cryptographic review, which allowed identifying such a subtle flaw that eluded multiple professional audits as well as state-of-the-art AI agents. The strength of Beam’s privacy guarantees depends on the robustness of its underlying cryptography, and that robustness is, in the end, upheld by the vigilance of the people who read and challenge the code.
