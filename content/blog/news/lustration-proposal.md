---
title: "Lustration Proposal: Verifying Beam's Supply Integrity"
description: "Following the emergency hard fork 6 and the correction of the vulnerability in the Bulletproofs implementation, this post details a 'lustration' process which is proposed as a one-time mechanism to verify Beam's circulating supply. The post is intentionally thorough, because the proposal involves a trade-off between privacy and supply certainty that every member of the community should understand when forming an opinion about it. This post aims at serving as a reference document for the upcoming BeamX DAO vote on whether to implement the lustration."
date: "2026-07-28"
category: "news"
image: "/images/blog/news/lustration-proposal/01.png"
tags:
  - "Beam core"
  - "Hard Fork"
  - "Lustration"
  - "Supply"
---

## Context

On June 13, 2026, a subtle vulnerability was discovered in Beam's Bulletproofs implementation. The issue was confirmed, patched in a private branch, and an emergency hard fork (HF6) was deployed at block 3928666. The full technical details of the vulnerability and the fix are described in the [Hard Fork 6 announcement](https://beam.mw/blog/news/hardfork-six).

The vulnerability is now closed and cannot be exploited going forward. However, due to Beam's privacy-preserving design, we cannot simply inspect the blockchain to confirm whether the vulnerability was ever exploited before the fix. On transparent chains like Bitcoin or Ethereum, any unauthorized supply creation would be immediately visible. On a privacy chain, amounts are concealed, so past soundness problems cannot be retroactively verified by simply reading the ledger.

The Beam developers assess the probability of exploitation of the vulnerability as *low*, for the reasons outlined in the previous post. But "low probability" is not "certainty", and that is an inherent trade-off privacy coins live with.

A process called *"lustration"* is a proposed mechanism to close that gap and increase certainty.

## Privacy vs Verifiable supply

The fundamental purpose of any blockchain is to prevent unauthorized supply creation (the double-spend problem). Without that guarantee, the entire system loses its meaning. On transparent chains, this guarantee is maintained continuously and publicly. On privacy chains, it is maintained *cryptographically*. And cryptography can have flaws and bugs.

This is not a problem unique to Beam. Every privacy coin faces the same reality: if a soundness bug ever existed, there is no way to look back at the chain and confirm it wasn't exploited.

The lustration process is one way to provide that confirmation, at the cost of a one-time, limited reduction in privacy.

## What is lustration?

The term *"lustration"* refers to a purification rite, a ceremony to restore cleanliness or credibility after a period of defilement. In our context, it describes a one-time process through which legacy transaction outputs ("TXOs", which contain coin amounts) must pass to verify their legitimacy.

![General definition of lustration](/images/blog/news/lustration-proposal/lustration-definition.png)

This is not a new concept in the privacy coin space. ZCash has long employed a "turnstile" system that verifies amounts when coins enter or exit its shielded pools, and this mechanism is currently serving a similar purpose as ZCash users migrate from the bugged Orchard pool into the new Ironwood one. Other privacy coins also recently implemented comparable lustration processes following their own vulnerability discoveries.

Yet, Beam's approach would not be a continuous transparency feature, but a *one-time gate* at a fixed block height which would preserve holders anonymity, confidentiality of all future amounts, as well as Mimblewimble's *cut-through* and *coinjoin* features.

## How a Beam transaction works today

Before going further, let's start with a brief reminder of the internals of Beam transactions.

A Beam transaction consists of *inputs* (TXOs being spent), *outputs* (new TXOs being created), and *kernels* (the cryptographic signatures that validate the transactions).

In **Mimblewimble transactions**, all input and output amounts are concealed, and zero-knowledge proofs guarantee that no coins are created during the transaction. All transactions within a block are *coinjoined*, meaning inputs, outputs and kernels are not linked in any way (i.e. if there are multiple transactions in a block, we cannot know which inputs or outputs belong to each of them).

![Illustration of Beam's coinjoined confidential transactions](/images/blog/news/lustration-proposal/mimblewimble-transactions.png)
*Illustration of Beam's coinjoined confidential transactions*

**Lelantus transactions** are similar to Mimblewimble transactions, except outputs are added to a *shielded pool*. And when spent, transaction inputs from the pool are created using a *one-out-of-many* cryptographic scheme that hides which specific previous deposit is being spent. It's worth noting that these *one-out-of-many* proofs were not affected by the vulnerability.

What is visible today in a block explorer:

- The number of inputs, outputs, and kernels in each block.
- The transaction fees.
- The coinbase (mining reward), which are the only non-concealed amounts in the blockchain.
- A range of 64 possible Confidential Asset ids for each TXO.

What is concealed:

- Individual amounts of all non-coinbase TXOs.
- The specific Confidential Asset id of all TXOs.
- Wallet addresses (neither sender nor receiver).
- The linkage between specific inputs and outputs.
- IP addresses and user identities.

The key cryptographic property of interest here is that every block contains zero-knowledge proofs that **the sum of all inputs equals the sum of all outputs**, even though not a single individual amount is revealed. The lustration process is built over this property.

## How the lustration would work

For the proposed lustration, a new hard fork would define a "gate" (or "turnstile") at a specific block height. From that height forward:

- **Old legacy UTXOs** (created *before* the lustration hard fork) must disclose their amount and their specific asset id the first time they are spent.
- **New UTXOs** (created *after* the lustration hard fork) remain fully confidential and never need any disclosure.
- The disclosure is made by the wallet itself (since nowhere else are the amounts known) and it happens **only once per UTXO**. After passing the lustration gate, the coins re-enter the concealed world and behave normally going forward.
- The gate stays **open forever**. An old UTXO sitting idle for years still has to pass through it whenever it is eventually spent. The only way to avoid lustration it to *never* move the coins again (basically making them dead).
- Nodes track the **cumulative disclosed total amount** per asset type and compare it against the known emission schedule (both for Beam and for any Confidential Asset). If anything exceeds the expected maximum, an alert is triggered.
- The process is **mandatory at the consensus level**. Transactions trying to spend old UTXOs without disclosing their amounts are rejected by miners. It is not an optional feature.

In practice, the wallet would handle the disclosure automatically. For the average user, the process would be seamless: Sending coins to oneself once would be sufficient to pass all legacy UTXOs through the gate.

![Illustration of the lustration reveal of old legacy inputs](/images/blog/news/lustration-proposal/lustration-process.png)
*Illustration of the lustration reveal of old legacy inputs*

## What is exposed. And what is not.

This is an important section to understand, because this is where privacy concerns are concentrated.

**Exposed:**

- The amount and the Confidential Asset id of each legacy input (pre-hard-fork), only at the moment it is spent. Nothing more.

**Not exposed:**

- Wallet addresses.
- IP addresses or user identities.
- Amounts and Asset ids of newer inputs, created post-hard-fork.
- Amounts and Asset ids of all outputs, and of anything forward.
- The linkage between specific inputs and outputs (i.e. coinjoin is preserved).

**Cut-through:**

- Mimblewimble's *cut-through* feature means that once a TXO is spent, it can normally be pruned from the blockchain (this is one of the reasons why the Beam blockchain is so lightweight).
- However, the lustration process has a subtle implication here: When a legacy TXO is spent and its amount and asset type are revealed, this information must stay in the blockchain. It cannot be completely forgotten since new nodes joining the network after the lustration must have the means to verify it too.
- Hence, when an old legacy TXO is spent, the blockchain will have to keep its commitment and the cryptographic "revealing" signature, so that the lustration can be independently verified by anyone, at any time.
- This permanent footprint will have a small but real cost on the blockchain's lightweight property.

![Screenshot of current explorer block view](/images/blog/news/lustration-proposal/screenshot-explorer-before-lustration.jpeg)
*Screenshot of current explorer block view. All amounts and exact Asset ids are concealed.*

![Mock-up of an explorer block view after lustration](/images/blog/news/lustration-proposal/screenshot-explorer-after-lustration.jpeg)
*Mock-up of an explorer block view after lustration (see the additional column in inputs).*
*Only old legacy inputs now show their amounts and exact Asset id.*
*Newer inputs, all outputs as well as everything else remain concealed.*

## Why a one-time disclosure is sufficient

Because every block holds a zero-knowledge proof that **the sum of inputs equals the sum of outputs**, verifying once that the legacy inputs don't exceed the maximum supply guarantees the same for all downstream outputs.

After these legacy inputs have been accounted for, the chain can continue operating with full concealment, and the supply integrity guarantee simply propagates forward. That's why the lustration is said to be like a "gate" or a "turnstile".

## Minimizing the privacy cost

The main privacy risk with the lustration process is the construction of a *"rich list"* (something which is normally not possible in a privacy coin). Indeed, Beam currently has low chain usage, which means that most blocks contain only one or two transactions. Thus, a patient observer could infer that all the input amounts exposed in a block likely belong to one wallet only.

To mitigate this privacy risk, special **UTXO management strategies** (automatic and/or through a specific tool) could be proposed to be applied *before* the lustration starts. With such strategies, large UTXOs could be splitted into smaller, standard (or randomized) amounts before the lustration height, so that they all appear similar. If the lustration is performed over several blocks, then no single disclosure would reveal total holdings.

An UTXO management tool could also allow selecting specific UTXOs for spending and consolidating, or even splitting, as needed. It would allow power users to better control how and when their coins pass the lustration gate.

## Collateral privacy advantages

It is worth mentioning that despite exposing of certain amounts, two collateral privacy advantages would come with the lustration process:

1. **Improved Confidential Asset id ranges**. All new UTXOs created after the lustration will use the new systematic CA id range definition that was developed some time ago but only released through hard fork 6. Instead of the old moving window of 64-id ranges, new UTXOs will carry either id:0 (Beam) or a range of 63 other possible ids. With this new scheme, it becomes impossible to know if a UTXO is either BEAM or a Confidential Asset. Over time, this creates a better-mixed anonymity set for confidential asset ids across the chain.

2. **Shielded pool enrichment**. If users send their coins to themselves through a Lelantus transaction during lustration, the anonymity set of the shielded pool will grow for all users going forward. The theoretical maximum for this anonymity set is 64k UTXOs, but even today the current pool is still far below that. A successful lustration campaign could increase the usage of the shielded pool, thus improving the anonymity set for everybody.

## Splitting the Lelantus shielded pool

The current shielded pool contains pre-HF6 UTXOs, and they will remain there forever. When spending from the pool, the *one-out-of-many* proof hides which specific shielded UTXO is being spent. So how does the lustration apply to the shielded pool?

The principle is the same as for regular Mimblewimble UTXOs: there is a clearly defined border between old coins and new ones, and every coin that crosses it must reveal its amount and asset type. No exceptions.

For the shielded pool, this means there will be a *split* between the old UTXOs and the new ones, with no mixing between them. When a shielded input is spent, the transaction indicates whether it is spending from the old side of the pool or from the new one. If it is from the old side, the amount and asset type are revealed, just like any legacy Mimblewimble UTXO. If it is from the new side of pool, then everything remains concealed as usual.

Technically, the shielded pool is a growing array, and its size is known at any point. When the lustration is activated, the current size of the pool becomes the separator between the old and the new sides of the pool. New UTXOs sent to the shielded pool after the lustration will go into the new side (above the separator), and when spent, they will only mix (via the *one-out-of-many* proof) with other UTXOs from that same new side of the pool.

In effect, the old side of the pool is abandoned, and a new one is created with a fresh anonymity set that starts empty. This is similar to what ZCash does when users migrate from the old Orchard pool to the new Ironwood one.

If the lustration process happens mostly through Lelantus transactions, the new pool's anonymity set will start filling up right away, although not necessarily very quickly, because most users would send their coins to the shielded pool *all at once*, thus creating *only one* new shielded UTXO per asset type and per wallet.

This also means that many of the initial shielded UTXOs of the new pool will have known amounts (since one shielded UTXO equals the sum of all its inputs, many of which would have been revealed).

Despite the two points above, performing lustration through Lelantus transactions is still significantly better than through regular Mimblewimble transactions, which expose the transaction graph and allow some chain analysis. Indeed, with the shielded pool, the transaction graph is broken: when coins from the new pool are spent, they cannot be linked to a specific shielded UTXO, nor to the original inputs whose amounts were exposed.

Moreover, the effect of both points above might be strongly reduced when specific UTXO management strategies are applied together with the lustration process (such as splitting holdings in multiple UTXOs of standard or random amounts, performing the lustration over several blocks, etc.).

In any case, over time, as users perform additional transactions through the shielded pool, the anonymity set will keep growing and the privacy of all its UTXOs will increase. The initial exposure is the price of a clean start, but it is a one-time cost only and it fades as the pool enriches.

## Smart contracts and already-visible amounts

Funds currently locked in smart contracts (such as DEX liquidity pools, Nephrite troves, the BeamX DAO, and any other onchain contracts) are already publicly visible in the explorer. Indeed, all amounts in smart contracts are visible by design (what is hidden is the wallets they come from). Thus, these funds do not need lustration.

The total circulating supply is therefore:

*Circulating supply = Sum of disclosed legacy UTXO amounts + Sum of smart-contract-locked amounts*

The lustration process only concerns the first part. The second part is already verifiable today.

![Example of the visible locked amounts within certain smart contracts](/images/blog/news/lustration-proposal/smart-contract-amounts.png)
*Example of the visible locked amounts within certain smart contracts*

## What if the lustration reveals the vulnerability was exploited?

This is the question the community raised most often, and it deserves a direct answer.

Lustration can **detect** inflation, but it cannot **ensure** it didn't happen and it cannot **mitigate** it fairly if it did. If the disclosed total exceeds the expected emission, we know something happened, but we cannot distinguish legitimate coins from inflated ones. They are all valid UTXOs.

Some options in that scenario could be the following and would need community decision:

- **Make excess UTXOs unspendable.** This would cap the supply, but it could block legitimate coins. The last users to pass through the gate would be the ones penalized, regardless of whether their coins were honest.
- **Accept the inflated amount into the official supply.** The network continues, holders' balances don't change, but the total supply becomes higher than initially intended.
- **Rollback the chain.** This was already rejected as infeasible, because we cannot know *when* the vulnerability was exploited. Reverting a month or more of history on suspicion alone is not justifiable, and there is no clear point to roll back to.
- **Fork and relaunch the chain**. A difficult decision which would require a lot of work, and could also lead to a full rebranding.

The realistic outcome (if exploitation indeed occurred), is that a careful attacker will only pass small amounts through the gate over time, aiming to stay under the threshold of coins presumed lost forever (from lost wallets, deceased holders, etc.) which will never move and pass the gate. In this scenario, the circulating supply will still end up capped below its original intended maximum. Some "lost" Beam would effectively have been replaced by some "inflated" Beam. But the actual balance of individual holders would not change, nor the total circulating supply.

Even with lustration, 100% certainty is impossible. Since lost wallets will never move and never disclose, some extra coins can technically trickle through the gate and take their place. Nonetheless, lustration would very significantly raise confidence regarding the supply integrity.

## Implementation considerations

The following aspects can be considered:

- The lead developer of Beam already confirmed that the consensus-level changes to implement lustration are straightforward and can be implemented in a few days. They will require another network upgrade (hard-fork 7).
- Some more work would be needed on the wallet side, and even more if some advanced UTXO management strategies are to be implemented.
- The wallet would perform the disclosure automatically. No manual cryptographic work would be needed by the users. Just moving the coins (even simply sending to oneself) would be enough to pass the lustration.
- Special UTXO management tooling could be released before the update, giving power users time to prepare if they need to fine tune how their coins will pass the lustration.
- Block explorers would be updated to display disclosed amounts and running totals, so anyone can independently verify the cumulative disclosed supply.

## Summary of the trade-off

The recent community discussions surfaced a range of positions, which can be broadly grouped into arguments in favor and arguments against implementing lustration. Both deserve to be stated in full, because the decision is not obvious, depends on individual perception and use cases, and reasonable people can reach very different conclusions.

### Arguments in favor

- **Supply verifiability is foundational**. The fundamental purpose of any blockchain, whether privacy-preserving or fully transparent, is to prevent unauthorized supply creation. Without a verifiable guarantee or a strong trust on the circulating supply, the whole system loses its meaning. Lustration provides a mechanism to verify the circulating supply in the case of a privacy chain.
- **Increased trust and confidence**. Even if the probability of exploitation is assessed as low, lustration lowers the perceived likelihood much further. It helps users feel more secure about the total supply, and that psychological effect is not trivial because it influences adoption (and hence price, and security), for Beam and for the Confidential Assets (BeamX, Nephrite, etc.).
- **The breach of privacy is acceptable and manageable**. The lustration process happens at the expense of a *one-time only* exposure of the circulating amounts. It only applies to transaction *inputs* and it does not directly reveal anything else about wallets and their owners. The collateral privacy cost is mitigable through UTXO management and by using the Lelantus shielded pool. Any additional information that could be inferred from the exposed amounts will disappear over time, as coins circulate and more transactions happen.
- **Early data and anomaly detection**. Some people estimate that 25-50% of coins are expected to pass through lustration in the first weeks, and that full lustration of all existing UTXOs will never happen. Nonetheless, this will still provide meaningful data to analyze about the supply integrity. For example, whether unusually large amounts appear, whether UTXOs with suspiciously close timestamps cluster together, etc. Such signals could be visible early if the inflation did happen and was massive.
- **Special cases for Confidential Assets**. In the case of Beam coins, the impact of inflation is primarily on price. But for bridged assets (such as bETH or bWBTC), there are third-party coins locked in the Ethereum contract that could be stolen if the corresponding Confidential Asset supply was inflated beyond the locked collateral. Lustration provides an additional layer of assurance here.
- **Lustration caps the future circulation of coins**. Even if the bug was exploited and inflated coins do exist, the lustration gate ensures they cannot circulate in large amounts without being detected. Small amounts might trickle through (passing lustration in place of the coins lost in dead wallets), but not excessive ones. The lustration gate stays open forever, so this guarantee is permanent.
- **Precedent and optics**. ZCash's current handling of its own inflation bug, including its turnstile system, is perceived to be positive for trust, usage and price. Implementing lustration is already considered as the right way for privacy coins to handle inflation bugs transparently and responsibly. It signals that the project takes supply integrity seriously.
- **Reveals actual liquid supply**. Lustration would give a clearer picture of how much Beam is actually in circulation versus lost or dormant, which is useful information for the market.

### Arguments against

- **The privacy cost is real and applies to everyone**. Lustration requires a one-time breach of privacy and that breach applies to *all users*, not just those who want and accept the verification. For a project whose reason for existing is privacy, this is a meaningful compromise. Certainty was never 100% to begin with (hidden bugs are always possible in *any* cryptographic system). Performing lustration demonstrates that privacy can be partially lifted, which might be seen as a breach of the project's basic commitments.
- **Significant operational burden**. Lustration creates work for both project maintainers and power users. For users with simple holdings, the process will be straightforward. But for advanced and very active users maintaining multiple positions and dozens of segregated wallets with real operational security requirements, the process is non-trivial and potentially disruptive.
- **No clear mitigation plan if exploitation is detected**. Lustration can detect inflation, but it cannot mitigate it fairly. If some disclosed totals indeed exceed their expected maximum, there is no clean response defined yet. An attacker who has already extracted value could push coins through the gate quickly, potentially displacing legitimate supply. Deciding to do lustration is not the same as deciding what to do if it detects a problem, and the community would face a difficult second decision in that scenario.
- **Lustration does not prove the bug was not exploited**. It can only indicate whether the circulating supply exceeds the expected maximum. It does not verify the supply in an absolute sense, nor does it even prove the absence of surplus coins. Lost wallets will never move and never disclose, and a patient attacker can trickle small amounts through over time. Complete purity is not achieved: the name "lustration" is somewhat aspirational. At any given moment, we would only know that the circulating supply is sound... so far.
- **Probabilistic linkability risk**. While wallet addresses are not exposed, the amounts are. If those amounts can be tied to KYC'd origins or identifying information through other means, probabilistic linking becomes possible. This is a concern for users whose operational security depends on not having their holdings visible, even in aggregate.
- **Two kinds of trust, in tension**. There is *user trust* (confidence that the social contract has not changed, that operational security is not compromised, that the project behaves a certain way "when things get thick"), and there is *investor trust* (the desire for sound money and verifiable supply). These are not the same, and they can be at odds. A decision that strengthens investor trust may weaken user trust, and vice versa. Privacy projects aiming for the level of user trust that Monero enjoys would likely never adopt such a lustration process.
- **The current economics do not change**. If the bug was exploited and inflated coins were already sold and distributed, those coins are already in the economy and the effect on price has already happened. Lustration does not reverse that. It provides peace of mind and a forward-looking cap, but it does not change the reality of the past supply distribution.
- **Uncertainty about detection accuracy**. Even if the lustration total stays below the maximum, that does not necessarily mean no exploitation occurred. It could mean that apathetic users with large dormant holdings outweigh an attacker's lustrated coins, or that the attacker was very careful. The picture only becomes clear quickly if the inflation was massive.

### Important clarifications

Two particular points should be made explicit, as they affect how the above trade-off can be weighed:

- **Lustration does not imply censorship**. If the lustration process reveals that the vulnerability was exploited, that finding does not automatically trigger any specific response. What to do in that scenario would be a separate community discussion. It might involve accepting the inflated supply, forking the project, relaunching, or other options. Launching the lustration is not a decision about what happens to the project if it detects a problem. Those are two distinct decisions.
- **The most probable outcome remains that no exploit is detected**. The developers assess the probability of exploitation as low, and the blockchain history has already been scanned for recognizable attack patterns with none found. If lustration proceeds and shows no excess, the community gains increased confidence in the supply integrity and the second decision (what to do if exploitation is detected) never needs to be made.

### Bottom line

Both positions are legitimate. The decision depends on how each member of the community weighs supply certainty against absolute privacy, on their personal tolerance for residual uncertainty, and on whether they view Beam primarily as an investment (where verifiable supply matters most) or as a privacy tool (where operational privacy matters most). The vote should be made with these trade-offs fully in view.

## Community discussion and next steps

Several discussions already happened these last few days in the community chats about the lustration proposal. The general sentiment among those who expressed an opinion leaned toward implementing the lustration, but strong genuine reservations were also made, particularly around the "rich list" concern, the direct and indirect privacy cost, and the lack of a clean mitigation plan if exploitation is detected.

The next step which has been proposed is a formal **BeamX DAO vote**. While this is a base-protocol issue rather than a DeFi governance matter, the BeamX DAO is the governance body available today (and the one which was recognized by the former Beam Foundation), and consulting the community before any such change is the right approach. The open questions (such as the one-click wallet solution or the UTXO management tooling) will need to be resolved as part of the implementation planning.

![BeamX DAO vote](/images/blog/news/lustration-proposal/dao-vote.png)

One ironic aspect worth noting: if the vulnerability was exploited to inflate the BeamX governance token itself, then an attacker could theoretically use those inflated tokens to influence the vote against the lustration! However, this would be difficult to hide because voting stakes are publicly visible, and locking BeamX for the vote makes holdings transparent. In a sense, the DAO vote itself acts as a specific lustration of the BeamX token alone.

Regardless, the vote will primarily be considered as a signaling mechanism: a way to formally confirm that the community broadly agrees with the direction. The effective adoption of the lustration would ultimately still depend on normal blockchain consensus, with miners and nodes accepting or rejecting the new hard fork through the network upgrade process.

## Conclusion

The hard fork 6 was a success, the vulnerability is now patched. The network is secure going forward. Privacy was fully preserved. The lustration process is now an optional additional step to try to verify the past. A one-time trade of partial privacy for increased certainty about the circulating supply. The subject raises many considerations and opinions about it can differ. Implementing it or not is not an easy decision to make.

**The choice belongs to the community.**

*The author and the Beam developers would like to thank the community members who participated in the discussion chats for their thoughtful engagement with this difficult technical and ethical question.*
