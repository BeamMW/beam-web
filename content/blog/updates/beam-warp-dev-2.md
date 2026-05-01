---
title: "Beam Warp Development Update #2: Testing and Benchmarking"
description: "Benchmarking the warp_dev3 devnet shows ~1.8s average transaction times, alongside dynamic tip trimming, multisig bridge ceremonies, and a fully operational dPoS contract."
date: "2026-04-08"
category: "updates"
tags:
  - Beam Warp
  - Sidechain
  - dPoS
  - Benchmarking
  - Development
---

We are thrilled to share the latest progress on Beam Warp, the super-fast sidechain designed for sub-second transactions, over 1000 TPS, and instant finality. Following the innovative dPoS (delegated Proof of Stake) integration, the developers have been testing and refining the sidechain architecture.
Performance Benchmarking
Testing on the warp_dev3 network has yielded impressive results. With a constant 3-second block time, the average transaction time (as experienced by the user) is approximately 1.8 seconds, with values varying from 400 ms up to 3600 ms.

![Transaction duration over time](/images/blog/updates/beam-warp-dev-2/tx-duration-timeseries.png)

![Transaction duration histogram](/images/blog/updates/beam-warp-dev-2/tx-duration-histogram.png)

In fact, the perceived duration mostly depends on when the transaction is submitted within the block's time window. If it’s early, it will have to wait until the end of the 3-second window. If it’s late, it will appear as completed much faster. And if it’s too late, it might have to be left for the following block (then leading to a perceived duration longer than 3 seconds).

![Perceived transaction times relative to block windows](/images/blog/updates/beam-warp-dev-2/perceived-tx-times.png)

Nonetheless, submitting transactions at random moments shows that around 5% of them complete in under 550ms (with the fastest recorded at just 180ms!). This confirms that the underlying network logic is incredibly efficient and it validates that the target of 1-second block times is technically achievable.
Beam Warp’s Dandelion protocol was also optimized for speed. The wait time used in Beam’s mainchain to allow potential coin joins during the "stem" phase was removed, allowing decoy outputs to be added immediately without delaying consensus.
Blockchain Size Optimization
The devnet also verified blockchain storage efficiency, even though a new block is created every few seconds. This is achieved through an innovative feature called "dynamic tip trimming" which automatically prunes away empty blocks. Consequently, the ledger's footprint remains lightweight, as in Beam mainchain.
Furthermore, the lead dev also optimized the fee distribution process. Previously, every non-empty block required an AddReward call to the dPoS smart contract. This has been removed, the node now directly updating the contract state to distribute fees. This reduces redundant processing and cleans up blockchain data without sacrificing transparency, as reward distribution remains visible in the explorer.
Bridging and Security
Testing of the two-way bridge between the devnet mainchain (dappnet2) and sidechain (warp_dev3) continues to be successful. A sophisticated development to secure this bridge now involves "multisig ceremonies". After block finalization, validators merge their signatures into one single constant-sized signature, accompanied by a bitmask. This not only significantly reduces block header bloat (one single signature instead of dozens) but also allows the mainchain side of the bridge smart contract to efficiently track changes in the sidechain validator set.
Another key security decision was made regarding non-validator nodes. To keep the network efficient and lightweight, only validators are now required to monitor the mainchain for bridge validity. Non-validator nodes skip this verification during transaction propagation, relying instead on the validators' signed blocks. This prevents a single misconfigured node from stalling the network.
Additionally, validators can configure a bridge_height_delay parameter to protect against potential mainchain reorgs.
Delegated Proof of Stake Parameters
The core economic engine of Beam’s sidechains is fully operational. The PBFT_DPOS smart contract manages the lifecycle of validators and delegators:
Dynamic Validator Sets: The network currently supports up to 96 active validators (this number could be increased at a modest cost). New validators can register by staking a minimum amount of coins (to be defined), while existing validators can be jailed or slashed for misbehavior.
Stake Delegation: Users can delegate their stake to validators via the same smart contract and earn a share of transaction fees, calculated proportionally to their stake minus the validator's commission.
Commissions: Validators can set a commission fee on delegator rewards (e.g. 5%). And users can be protected by configuring the contract so that commission can only be reduced, not increased.
Reward Distribution: For each block, fees are distributed among non-jailed validators. However, the process is optimized to compute effective rewards only when a validator or delegator state changes, rather than for each and every block.
Lastly, the explorer has been updated to visualize this data, displaying each validator's status, voting power (stake), commission, and accumulated rewards.

![Explorer view of the PBFT_DPOS contract state](/images/blog/updates/beam-warp-dev-2/explorer-validators.png)

Looking Ahead
The devs are discussing the optimal parameters for the next devnet, specifically the minimum stake, and the target number of validators to balance decentralization with speed. Preliminary analysis suggests a minimum stake of ~150,000 BEAMX could support up to 100 validators while maintaining performance.
With the Beam Warp implementation feature-complete and already showing exceptional speed, further testing and optimization now continue in areas like SBBS communications and wallet data management.
More news to come as we approach the next milestone!


