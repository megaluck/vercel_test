Table of Contents 1. Executive Summary 2. Technology Overview 3. Latest
Developments (Past 12--18 Months) 4. Roadmap & Direction 5. Zcash
Shielded Assets (ZSAs) & Terminology 6. Ecosystem & Adoption 7. On-Chain
& Network Health 8. Governance, Funding & Institutions 9. Regulatory &
Market Context 10. Risks & Open Questions 11. Competitive Landscape 12.
References Executive Summary Zcash (ZEC) is a privacy-focused
cryptocurrency launched in 2016 that uses zero-knowledge proofs to
enable confidential transactions. Over the last 12 months (mid-2024 to
mid-2025), Zcash has undergone significant technological and
organizational changes. Leadership & Governance: Zcash's founding CEO,
Zooko Wilcox, stepped down in December 2023 after eight years at the
helm. He joined a new Swiss nonprofit, Shielded Labs, to accelerate
Zcash's transition toward a hybrid Proof-of-Stake consensus called
"Crosslink" , while ECC's former COO Josh Swihart took over as CEO of
Electric Coin Co. (ECC) . The community also began charting a new
development fund beyond the first halving era: plans for a "Zcash
Sustainability Fund" (now referred to as a Network Strategic Reserve)
were introduced to ensure ongoing funding without inflating supply .
This will replace the current dev fund that expired in November 2024
with a long-term model, pending community agreement. Regulatory Climate:
Global regulatory pressure on privacy coins intensified. In late 2023,
several exchanges moved to delist or restrict privacy coins like Zcash.
For example, OKX announced it would delist ZEC (and other top privacy
coins Monero and Dash) by January 2024 . Binance also warned it might
globally delist Zcash by February 2024 unless measures were implemented
to prevent fully shielded withdrawals to the exchange . In response, the
Zcash community and ECC discussed technical solutions -- including an
"exchange-friendly" address type that would only use transparent funds
-- to appease exchanges . While some exchanges (OKX, Coincheck, etc.)
proceeded with delistings, others like Gemini and Coinbase affirmed
support for ZEC , highlighting that compliant privacy is possible . To
mitigate centralized exchange risk, Zcash also pursued decentralized
avenues : in May 2025 ECC announced Zcash's integration with the Maya
Protocol (a Thorchain-based DEX network), enabling trustless cross-chain
swaps and payments with shielded ZEC . This "DEX access" is seen as
crucial for resilience against exchange de-platforming. Technology &
Product: On the tech front, Zcash's core protocol remained on
Proof-of-Work (Equihash algorithm) with strong privacy through its
shielded addresses. No new network upgrade activated on mainnet in 2024,
as the next major upgrade (NU7) is slated for late 2025. However ,
development was fast-paced off-chain: ECC and the Zcash Foundation
collaborated on a new Rust-based node stack (the Zebra consensus node
plus a new wallet "Zwallet/Zallet") to eventually deprecate the legacy
zcashd client . A critical upcoming feature is Zcash Shielded Assets
(ZSAs) -- the ability to issue and transact user-defined tokens with
Zcash's privacy -- which is being developed by the QEDIT team under
grant. By mid-2025, ZSA implementation was largely completed on a
testnet and undergoing audits,12 3 4 5 67 8 910 1112 1

aiming for mainnet in Network Upgrade 7 . Notably, deploying ZSAs
requires the new node software stack, since the old zcashd won't support
them . User-facing improvements also advanced significantly. ECC
launched Zashi , a first-party mobile wallet, in April 2024, and rapidly
iterated on it through 2025 . Zashi provides a friendly, shielded-by-
default experience with features like one-tap shielding of transparent
funds, address books, and hardware wallet (Keystone) support . By April
2025, Zashi 2.0 rolled out a full redesign focused on usability --
including a real-time status "wallet widget" guiding users through
shielding, syncing, and backups . Subsequent updates (v2.1 in August
2025) added advanced privacy tools, notably built-in Tor network
integration to route all wallet traffic through an anonymity network .
This multi-layered approach (network privacy via Tor atop Zcash's
cryptographic privacy) underscores Zcash's strategy to remain the leader
in privacy tech. Key Takeaways: Zcash is doubling down on its privacy
mission amid external pressures. The past year's milestones -- new
leadership, development fund reforms, growing regulatory scrutiny, and
breakthroughs like ZSAs and wallet UX improvements -- mark a pivotal
period. Zcash's immediate next milestones include the NU7 network
upgrade (targeted for October 2025) which is expected to activate ZSAs
and transition the network to the new software stack . In parallel,
research and development continue toward hybrid PoW/PoS (Crosslink) for
a future upgrade, aiming to improve network security and align ZEC's
emission with long-term incentives . In summary, despite market
headwinds and competition, Zcash enters late 2025 with renewed momentum:
a clearer roadmap, an expanded set of privacy features, and a community
intent on balancing regulatory compliance with uncompromised financial
privacy. Technology Overview Protocol Basics: Zcash is a Bitcoin-derived
blockchain with a fixed supply of 21 million ZEC and uses Proof-of-Work
(Equihash) for block mining. Its defining feature is an integrated
zero-knowledge proof protocol that enables shielded addresses
(z-addresses) whose balances and transaction details are encrypted
on-chain . Users can choose between transparent addresses (t-addresses)
, which behave like Bitcoin UTXOs and reveal amounts and parties, or
shielded addresses , which use zk-SNARK proofs to hide the sender ,
receiver , and amount . Uniquely, Zcash transactions can be mixed :
funds can be transferred from a shielded address to a transparent one or
vice versa, allowing selective disclosure. A fully shielded ZEC transfer
(z→z) offers strong privacy, while "shielding" (t→z) or "deshielding"
(z→t) transactions reveal one side of the equation. This flexibility is
powerful but places importance on user behavior; only
shielded-to-shielded transactions are completely confidential . To
enable private verification, Zcash initially relied on a parameter setup
ceremony (the Sprout MPC in 2016) to generate trapdoor public parameters
for its original SNARK circuit. Modern Zcash has eliminated this trusted
setup requirement via new cryptography (Halo 2), as described below.
Shielded Pools Evolution: There have been three generations of Zcash
shielded pools, corresponding to major protocol upgrades. The first
pool, Sprout , launched with Zcash's genesis (2016) and used the
original zk-SNARK circuit with a complex trusted setup. Sprout addresses
(starting with "zc") were computationally heavy (transactions could take
\~40+ seconds to prove) and had relatively large memory requirements,
limiting usage. In October 2018, Zcash activated the Sapling upgrade
(codename NU2) which introduced a vastly improved SNARK circuit and new
Sapling addresses (beginning "zs") . Sapling's proving system (Groth16
SNARKs) and new elliptic curves made shielded transactions \~6x faster
and lighter , enabling practical mobile wallet support and broader
adoption . Sapling also implemented key improvements like diversified
addresses and spending keys that could derive multiple addresses,
enhancing usability. The old Sprout pool was deprecated -- users were
encouraged to13 14 1516 1718 1920 2122 23 2425 2627 2829 30 31 3233 34 2

migrate funds to Sapling, and by 2020 only a tiny fraction of ZEC
remained in Sprout addresses. In May 2022, Network Upgrade 5 (NU5)
activated Zcash's latest pool, Orchard , featuring the Halo 2 proving
system . Orchard addresses (unified "u" addresses containing an Orchard
component) require no trusted setup, as Halo 2 uses a novel recursion of
proof technique (a zk-SNARK without setup ). Orchard further improves
efficiency and supports the new Unified Address format that bundles
multiple receiver types into one address string . Post-NU5, Zcash's
recommended usage is via Unified Addresses (UAs), which by default
include an Orchard shielded receiver (and previously a transparent
receiver for backwards compatibility). In practice, this means funds
sent to a UA go into the Orchard shielded pool unless otherwise
specified. Today, the Sapling and Orchard pools are both active, but
usage is shifting strongly to Orchard. For example, popular wallets like
Zashi now default to shielded-only UAs , removing the transparent
receiver entirely for better privacy . The legacy Sprout pool is
effectively obsolete (its support was removed from wallets, and a
consensus rule prevents any remaining Sprout funds from being sent
except to Sapling/Orchard). Each new pool had its own multi-party
ceremony: Sapling's "Powers of Tau" and "Sapling MPC" in 2018, and the
Halo proving system in Orchard obviated the need for a repeat ceremony .
As a result, Zcash's strongest privacy now relies only on the assumption
that Elliptic Curve cryptography is secure, rather than on trust in a
past ceremony. Consensus and Network Upgrades: Zcash's consensus
algorithm remains Proof-of-Work Equihash (using
Equihash`<sub>`{=html}200,9`</sub>`{=html} initially, with slight
adjustments in 2019). Block time was originally \~150 seconds, but the
Blossom upgrade (December 11, 2019) halved it to 75 seconds to improve
transaction throughput . To maintain the emission schedule (same 4-year
halving cycle as Bitcoin), Blossom also halved the block reward, so the
overall supply curve remained unchanged . As of 2025, Zcash's block time
is 75s and block reward 3.125 ZEC (post-second halving), with the next
halving expected in 2028. Notable past network upgrades include:
Overwinter (June 26, 2018): The first ever Zcash upgrade, focused on
enabling upgrade mechanisms (versioning, replay protection) and minor
consensus changes. Overwinter paved the way for frequent upgrades by
adding an expiration height to transactions . Sapling (Oct 28, 2018):
Introduced the Sapling shielded pool with major performance improvements
. Sapling reduced zkSNARK proving time and memory drastically, making
shielded transactions usable on mobiles. It also implemented turnstile
enforcement to begin deprecating Sprout (all Sprout-to-Sapling
migrations were encouraged) . Blossom (Dec 11, 2019): Adjusted block
timing and split the Founders' Reward to extend over more blocks (since
blocks came twice as fast) . Blossom also prepared ground for the coming
first halving. Heartwood (July 16, 2020): Enabled Shielded Coinbase
(miners can mine directly to a shielded address) and deployed Flyclient
support (light client protocol) . Shielded coinbase was a significant
privacy win, as it allowed coinbase rewards to enter the shielded pool
without ever being exposed, increasing the overall anonymity set .
Heartwood's activation at block 903,000 was a success, with several
miners opting in to shielded mining . Canopy (Nov 18, 2020): Activated
at block 1,046,400 (Zcash's 4th birthday) , this upgrade ended the
Founders' Reward and initiated a new development fund from 2020--2024.
Canopy's consensus change redirected 20% of block rewards to addresses
controlled by ECC, the Zcash Foundation, and a new Grants committee, per
community-approved ZIP-1014 . This resolved35 3637 3839 4041 4243 44 •
45 • 46 4748 • 49 • 50 51 52 • 53 54 3

a long-running debate on funding after the initial founder rewards
expired. Canopy also removed the last Sprout turnstile: any remaining
Sprout value required migration as Sprout addresses could no longer send
funds after Canopy (effectively "freezing" the Sprout pool). NU5 "Halo
Arc" (May 31, 2022): The most recent major upgrade, NU5 deployed the
Orchard shielded protocol and Halo 2 proving system on mainnet . This
removed reliance on trusted setups for Zcash's future, as Halo allows
recursive proving without toxic waste. NU5 also introduced Unified
Addresses , a unified encoding for receiving ZEC that can include
multiple receiver types (transparent/Sapling/Orchard) under one address
string . Unified Addresses greatly simplify the user experience by
eliminating the need to juggle multiple address types -- the wallet or
sender chooses the appropriate receiver internally. Another NU5 feature
was Transaction Batch Validation for performance and a new transaction
format (authorized with Halo signatures instead of older spend authority
signatures). Zcash improvement proposals (ZIPs) guide protocol changes,
with ECC and Zcash Foundation jointly managing the upgrade pipeline.
Upgrades are endorsed by both organizations per the Zcash trademark
agreement . Historically, Zcash targeted one major network upgrade about
every 12--18 months, though this cadence slowed after NU5 as focus
shifted to extensive R&D (Halo, PoS) and re-architecting the codebase.
The upcoming NU6/NU7 upgrades are expected to be transformative (see
Roadmap section), potentially moving Zcash to a novel hybrid PoW/PoS and
adding asset functionality. Privacy Model: Zcash's privacy is often
characterized as "opt-in but strong" . Unlike Monero (where all
transactions are private by default), Zcash allows transparency, but
when users do opt to shield, the cryptographic anonymity set is large
and robust. A fully-shielded Zcash transaction reveals nothing on- chain
beyond an encrypted memo field (if used) and proof that balances sum to
zero. Thanks to continuous improvements, Zcash's shielded pool has grown
in size and usage, which improves privacy for everyone. By mid-2025,
roughly 20% of the total ZEC supply is held in shielded addresses -- up
from only \~4% in 2017 -- reflecting steadily increasing adoption of
privacy features. Notably, shielded usage accelerated after Sapling and
then again after Unified Addresses were introduced. In April 2020, only
6% of transactions were fully shielded (z→z), and \~15% of all
transactions had any shielded component . Those figures have grown as
more wallets default to shielded sends. Zcash's design also benefits
from "network effect" privacy: even if not all users shield, those who
do still gain cover from the overall pool. For example, someone
withdrawing from a shielded wallet to a transparent exchange deposit
breaks the link to their original address -- Chainalysis reported in
2020 that it could not trace shielded origins and that "no one can see"
shielded address balances or transaction details . As the ECC has
emphasized, the larger the shielded pool and usage, the stronger the
collective privacy . Zcash also supports view keys to allow optional
auditing of shielded addresses by trusted third parties (useful for
compliance or personal record-keeping). This feature lets the address
owner reveal all incoming/outgoing transactions without compromising
on-chain privacy to the public . Viewing keys have seen limited use so
far but remain a unique capability that balances transparency and
privacy needs. In summary, Zcash's technology stack combines
Bitcoin-like fundamentals (decentralized PoW ledger) with cutting-edge
cryptography for privacy. It has evolved through multiple network
upgrades to enhance efficiency and remove trust assumptions. With the
advent of Halo 2 and Unified Addresses, Zcash now offers trustless
privacy at scale -- positioning it as one of the most advanced privacy
protocols in production. The next sections will outline recent
developments, including how these core technologies are being extended
(e.g. to assets and new consensus mechanisms) and improved in practice.•
35 3637 5556 57 5830 2627 59 60 4

Latest Developments (Past 12--18 Months) (This section covers roughly
early 2024 through mid 2025, highlighting significant technical,
product, and community developments.) Product Releases & Wallet
Innovations: The flagship product development has been ECC's Zashi
wallet , which launched its 1.0 version in April 2024. Zashi is a
mobile, shielded-first wallet aimed at making private transactions
seamless for everyday users . Over the past year , Zashi saw a rapid
cadence of updates driven by user feedback. By October 2024, version 1.2
introduced features like an integrated address book for frequent
contacts, a "request ZEC" QR code generator , and a redesigned send
screen with smarter UX (e.g. hiding the memo field when sending to
transparent addresses) . These improvements addressed pain points in
usability, recognizing that good UX is critical for privacy tech
adoption. Zashi also implemented biometric spend authorizations and
in-app currency conversion (showing ZEC values in fiat) to align with
mainstream user expectations . The biggest leap came with Zashi 2.0
(released April 28, 2025, on Zashi's one-year anniversary) . This update
was a ground-up redesign focused on "privacy by default without
confusion." A marquee feature is the Wallet Status Widget , a real-time
guide that gives users a clear status of their wallet operations
(syncing progress, whether funds are awaiting shielding, backup
reminders, etc.) . For instance, if a user receives funds to a
transparent receiver (perhaps from an exchange withdrawal), Zashi 2.0
will block spending until those are shielded, and the status widget will
prompt and shortcut the shielding process . This ensures users do not
accidentally "deanonymize" themselves by spending unshielded ZEC,
reinforcing the wallet's shielded-by-default ethos. Zashi 2.0 also made
restoring wallets much smoother by auto-estimating the "birthday" block
height from a user's first transaction date, sparing non-technical users
from manual input . The navigation was revamped to surface key actions
(Send, Receive, Scan QR) more intuitively . All these changes stem from
ECC's philosophy that usability is a security feature -- if privacy
features are too difficult, users may avoid them . Early community
feedback on 2.0 was positive, though a UI bug on certain Android devices
was quickly patched by the Zashi team within days . After 2.0, ECC
released iterative updates: by Q3 2025, Zashi 2.1 (August 2025)
introduced built-in Tor network support in beta . Initially, Zashi had
only used Tor to fetch exchange rates anonymously, but v2.1 expanded Tor
integration to cover sending transactions, fetching block data, and even
integrating upcoming cross-chain features (Maya Protocol) through the
Tor network . Routing all wallet network traffic via Tor protects users'
IP addresses from lightwallet servers and third- party APIs, adding
another layer of privacy beyond Zcash's on-chain encryption. Notably,
the Tor library used ("Arti") was funded by Zcash Community Grants and
developed by the Tor Project in Rust, reflecting a productive
collaboration between the privacy project communities . Zashi's team
notes that with Tor on by default, even metadata leakage (like timing
and frequency of transactions) is obscured . This move came at a time
when mainstream browsers like Brave also integrated Zcash -- in April
2025, Brave Browser's native wallet added shielded ZEC support ,
allowing users to buy/send/receive ZEC within Brave with full shielding
. The Brave integration was heralded as a milestone: it marks the first
major browser wallet to support Zcash shielded transactions, further
normalizing privacy tech for everyday use. ECC and Brave had announced
this partnership in late 2023, and by April 2025 desktop Brave users
could use shielded addresses (with mobile support following later in
2025) . Another subtle but impactful change was Unified Address
evolution . Initially, Unified Addresses (UAs) included a transparent
component for backward compatibility, but this led to potential privacy
pitfalls if a user shared a UA thinking it was "shielded" -- an observer
could send a tiny amount to the transparent part and link it. After
community discussion, ECC decided to remove the default inclusion of
transparent6120 62 63 64 15 1920 65 66 67 68 6970 21 7172 73 74 7576
7778 5

receivers in UAs generated by their wallet. In May 2025, Zashi 2.0.3
began generating shielded-only UAs (still prefixed with "u", but
containing only Orchard and Sapling receivers) . Users who need a
transparent address can still fetch one in the app, but it's separate.
This update acknowledged that exchanges never adopted unified addresses
(they continue to use classic t-addrs) and that including a t- receiver
by default was more risk than benefit . The change represents the
ecosystem's shift toward shielded-first defaults . It also underscores
that Zcash's design can adapt as usage patterns become clearer -- in
this case, choosing to favor user privacy over theoretical convenience,
given exchanges' stance. Outside of ECC's wallet, the broader Zcash
ecosystem saw improvements too. The Zcash Foundation's Zebra (zebrad)
full node reached production-ready status. By late 2024, Zebra fully
synced mainnet and supported all consensus rules equivalent to zcashd,
and developers started testing it in concert with ECC's Zwallet/Zallet
(a lightweight CLI wallet) as a complete stack . This new stack (Zebra +
Zwallet) is intended to replace zcashd entirely in the coming upgrades,
finally unburdening Zcash from the legacy Bitcoin C++ codebase . During
the Zcon conference and a special ECC summit (Z\|ECC Summit) in January
2025, it was announced that zcashd deprecation is a top priority for
2025, and that Zcash Foundation volunteers had begun packaging the new
Zebra/Zwallet stack in Docker for early testing . By mid-2025,
cross-compatibility testing was ongoing and the target was that NU7
activation (set for late 2025) would only be supported on the new stack,
effectively sunsetting zcashd for network consensus . This is a
monumental shift years in the making -- Zebra (written in Rust) promises
easier maintenance and better security practices than the aging zcashd
(C++ fork of Bitcoin Core). Protocol & Research Breakthroughs: The most
prominent protocol development is, as noted, Zcash Shielded Assets
(ZSAs) . ZSAs allow anyone to create their own tokens that live within
Zcash's Orchard shielded pool, inheriting the same privacy properties as
ZEC. Throughout 2023 and 2024, the QEDIT team (recipients of a major
grant from Zcash Foundation) designed and implemented the ZSA circuits
and logic as an extension to Orchard . By April 2023, QEDIT had ZSAs
working in a custom branch and proposed their integration into Zcash's
next network upgrade (which at the time was projected as NU6) . They
also outlined support for asset swaps -- effectively private DEX
functionality on-chain -- by allowing atomic swap transactions between
ZSAs and ZEC or between two ZSAs . In late 2024, progress was showcased
with a public demo and a specialized testnet. The ZSA implementation
uses two new ZIPs (ZIP-226 and ZIP-227), defining how assets are issued
and transferred under shielded addresses . An audit of the ZSA circuits
was planned and is presumably concluding around mid-2025. The goal was
to have ZSA code ready by spring 2025, lining up with the NU7 schedule .
Indeed, ECC confirmed that NU7 is "assumed to focus on ZSAs" largely
driven by QEDIT's work . The only blocker is that ZSAs will not be
back-ported to zcashd , meaning the network must transition to
Zebra+Zwallet for ZSAs to activate . This dependency contributed to NU7
being delayed from an initial target of summer 2025 to fall 2025 .
Community testing of ZSAs began via an ephemeral testnet, and excitement
is high -- ZSAs could bring Zcash functionality closer to smart contract
chains (like issuing stablecoins or NFTs, but with Zcash privacy). It's
worth noting that ZSA transactions will include an extra proof for the
asset circuit, and discussions have considered how fees will be paid
(likely still in ZEC, requiring a mechanism to charge ZEC fees for ZSA
transfers). UX implications (like asset identifiers in addresses) are
also being worked out, but wallet developers have been involved early to
ensure readiness. Another research area is consensus change : moving
away from pure Proof-of-Work. In August 2024, Zooko's above-mentioned
move to Shielded Labs put a spotlight on "Crosslink," a proposed hybrid
PoW/PoS algorithm for Zcash . The rationale is both economic and
technical. Economically, continuous PoW mining creates sell pressure
(miners dumping coins), which is easing now due to halving but still
significant . Technically, introducing PoS can provide finality
(preventing chain3839 79 8081 11 8082 11 8384 47 8586 87 88 88 14 89
9091 92 6

reorgs beyond a checkpoint) and allow staking by ZEC holders .
Throughout 2024, a team at another Zcash-aligned entity, Shielded Labs
(led by researcher Dean Tribble and others), worked on a blueprint for
this hybrid consensus nicknamed " Crosslink ." It's envisioned as a
trail to full PoS: possibly first adding a PoS finality layer on top of
PoW (so-called "trailing finality") , then gradually increasing PoS's
role. By early 2025, Shielded Labs had reportedly completed a first
phase of design and was building a simulator . The collective Zcash dev
community (ECC, ZF, Shielded Labs, etc.) coordinated roadmaps and agreed
that hybrid consensus is a priority once ZSAs and the new node stack are
out. There is not yet a concrete activation height or ZIP for Crosslink,
but optimistic timelines suggest maybe 2026 for a testnet/prototype. The
effort received high-profile support, with donations from the Ethereum
Foundation's Vitalik Buterin and the Winklevoss brothers to Shielded
Labs . This infusion (announced Aug 2024) and Zooko's involvement signal
momentum. Still, community consensus will be needed; Zcash users will
have to weigh trade-offs (e.g. decentralization of mining vs. staking).
For now, the development is largely in R&D, not affecting mainnet yet.
Besides these marquee items, there were numerous security improvements
and audits . In late 2023, Trail of Bits performed an audit on Zcash's
Halo proving system implementation; no critical issues were found
publicly. ECC also disclosed and patched some non-trivial bugs in zcashd
-- for example, a fix for an issue in the transaction mempool logic that
could theoretically be abused (this was detailed in a June 2024
technical blog). There were no major security incidents on Zcash in the
past year -- no protocol hacks, no inflation bugs reported. This
contrasts to some previous years (e.g. a counterfeiting bug found in
2018 was kept secret until fixed). The stability of Zcashd has been
decent, though ECC did flag that zcashd would not be developed beyond
essential maintenance, focusing engineering on the new Rust stack .
Finally, community and governance developments merit mention. In H2
2024, the Zcash Community Grants committee (ZCG) funded a variety of
ecosystem projects: among them, ongoing support for third-party wallets
like Nighthawk Wallet and YWallet , an open-source block explorer , and
educational content such as Zcash Media's video projects. ZCG also
funded infrastructure like Arti (Tor integration library) which paid off
directly in Zashi's Tor feature . The community forum saw intense
debates on topics like development funding renewal (covered in
Governance section) and how to increase shielded adoption. One concrete
initiative was the "Shielded by Default" campaign encouraging services
and users to utilize Unified Addresses -- this influenced ECC's decision
to drop default transparent receivers in UAs, as mentioned. The tone in
the past year has been one of pragmatism: realizing that certain
exchanges may never integrate privacy features, Zcashers have pivoted to
building workarounds (DEX integration, shielded-first wallets, etc.)
rather than compromising on privacy. In short, the last 12--18 months
have been among the busiest in Zcash's history, setting the stage for a
new era of capability (with assets and interchain liquidity) and laying
infrastructure for the next 5+ years of protocol evolution (new nodes,
new consensus). Roadmap & Direction Zcash's roadmap in 2025 is both
ambitious and more collaboratively defined than ever . At a July 2025
Zcash developers summit, ECC, Zcash Foundation, and other contributors
agreed on a shared protocol roadmap for the next 18 months . This
coordinated plan reflects that multiple teams (ECC, ZF's devs, QEDIT,
Shielded Labs, etc.) are now contributing in parallel. The roadmap is
nevertheless "directive and unrestrained -- not fixed" , as ECC often
states, emphasizing agility due to evolving conditions . Still, there
are clear targets: Near-Term (2025): The top priority is Network Upgrade
7 (NU7) , aimed for activation around October 2025 (testnet activation
in summer). NU7 is expected to include the launch of Zcash Shielded
Assets9394 95 96 97 80 73 98 99 7

(ZSAs) on mainnet , making it perhaps the biggest feature addition to
Zcash since launch. To achieve this, the ecosystem must finish Zcashd
deprecation -- i.e. ensure the Zebra node and new Zallet can fully
support all functionality by NU7 . The Zcash Foundation took on an
action item to containerize (Dockerize) the new stack and solicit early
feedback from exchanges and third-party developers to smooth the
transition . As a contingency, if the new stack isn't ready in time, NU7
could be delayed further; however , in Jan 2025 ECC management noted the
timeline already slipped from August to October , and ZF stepping up has
mitigated some schedule risk . There is strong community consensus that
ZSAs shouldn't be delayed beyond 2025, so all efforts are aligned to
make NU7 happen by year's end. In addition to ZSAs, NU7 likely includes
"memo bundles" (an enhancement to allow multiple memos or larger memo
sizes in a transaction) , as well as any protocol clean-ups needed after
NU5. It may also activate a new transaction fee mechanism: one item
under consideration for NU6/7 was introducing explicit fee fields in
transactions rather than the current implicit 0.0001 ZEC fee . This
would allow dynamic fees if needed for congestion, and is conceptually
simple though not urgent under current usage. ECC's Q1 2025 roadmap
mentioned implementing "memo bundles and cross-ecosystem collaboration"
as a focus that quarter . By late 2024, there was also discussion of a
NU6 in between NU5 and NU7, possibly to deploy minor features (like the
above fee change or dev fund adjustments). In practice, NU6 did not
occur as a standalone major upgrade on mainnet in 2024; instead, some
changes like the new Dev Fund allocations were handled via the Canopy
consensus already in place (the Canopy schedule continued until the
halving in Nov 2024). Thus, NU7 will effectively be the next activation
since NU5 in 2022, making its content quite substantial. Development
Fund & Governance Roadmap: A critical piece of Zcash's direction is
establishing the next Dev Fund mechanism (2024 onward) . The original
community mandate for the Development Fund covered block rewards from
late 2020 through the second halving (November 2024). With that period
elapsed, the community had to decide how (and if) to continue funding
ECC, ZF, and grants. In mid-2023, ideas emerged for a Zcash
Sustainability Fund (ZSF) which would set aside a portion of the
remaining ZEC supply (from unmined coins) to fund development
indefinitely . One proposal by a community member suggested allocating
\~26% of future issuance to an "Unissued Reserve" that could be managed
for grants and ongoing costs . However , it became clear that
formalizing this in time for the halving was challenging. As an interim
step, the existing block reward split (80% miners, 20% dev fund) has
likely continued into 2025 under the same ZIP 1014 allocations, pending
a new agreement (this was possible because the coinbase funding streams
were implemented without a fixed end date, though the community could
change them via a new ZIP). Zooko's August 2024 post indicated
implementing the new fund "as fast as possible" was a priority , meaning
we should expect a ZIP update in 2025 to create a new allocation scheme.
There is discussion of moving to a multi-signature controlled treasury
(the "Network Strategic Reserve") governed by a broad committee or smart
contract-like arrangement, to increase accountability and flexibility .
Additionally, decentralized governance was a thematic goal for 2025 .
The community planned to explore models beyond the ad-hoc polling and
forum debates used so far . One concept floated was a Zcash "Zenate" or
Zcash Congress of elected representatives (this was mentioned on forums
as a way to formalize off-chain governance). While still in early
stages, the Zcash Foundation signaled interest in improving governance
processes for major decisions. For example, ZF conducted a Community
Advisory Panel (ZCAP) vote in 2023 to gauge support for various dev fund
approaches; similar mechanisms might be used to approve any new dev fund
ZIP or PoS transition. We can expect community referendums on big
changes like Crosslink (since moving to PoS is a huge shift requiring
social acceptance). In summary, the governance roadmap involves maturing
the decision-making framework -- making it88 100 80 8980 101 37 102 90
103 104 105 23 8

more inclusive and perhaps weighted by stake or reputation -- to handle
the increasingly complex choices ahead. Long-Term (2025--2026): If NU7
is delivered by end of 2025, the focus will shift to Crosslink (hybrid
PoW/PoS) implementation. Shielded Labs' plan for Crosslink likely spans
multiple Zcash upgrades: possibly a NU8 in 2026 to introduce a PoS
finality layer , then a later NU9 to tweak the mining vs. staking reward
ratio. According to the roadmap shared in July 2025, work on a Crosslink
prototype is slated to begin once NU7 code is complete (ECC indicated
Hybrid Consensus R&D would resume in late 2025 after NU7 support work) .
If things go well, an early testnet with hybrid consensus could be out
by Q1 2026. However , this is speculative and depends on research
breakthroughs. A specific sequence was outlined: finish design phase 2
(done in H1 2024) → build simulator (H2 2024) → transient testnets
perhaps by end of 2024 . Some transient testnets did occur for other
features (like an experimental proof-of-stake "Nightfall" testnet by an
independent group, though not official). The Crosslink timeline remains
an open question, but ECC and others have publicly expressed that moving
to PoS is important for Zcash's viability in the next decade. Notably,
Ethereum's successful PoS transition (2022) has set a precedent that
such moves can be done on major networks. Another future direction is
scalability and performance . With Halo enabling recursive proofs, in
theory Zcash could explore layer-2 solutions or batching transactions
via recursive SNARKs. ECC's marketing has occasionally hinted at Halo's
potential for scalability (trustless light clients, etc.), but concrete
plans were deferred while core features like ZSAs and PoS are in
progress. By late 2025, the groundwork (Halo, unified addresses, etc.)
is in place to consider more advanced features like shielded Lightning
networks or payment channels . There's also the concept of "liberated
payments" that ECC mentioned -- an idea to send ZEC to a user identity
(like an email or phone) via a messaging layer , which was under R&D in
2024 . This could reappear on the roadmap as a way to improve user
experience (sending to aliases rather than raw addresses, while
maintaining privacy). The Zcash Foundation's own roadmap (distinct from
ECC's product roadmap) in 2025 included furthering FROST (threshold
signing for shielded addresses) to enable things like multi-signature
shielded transactions. A FROST implementation was being tested in 2023
and could allow shielded multi-sig -- beneficial for custody solutions
and decentralization (e.g. multisig community wallets). If ready, that
could become a ZIP and be slotted into a near-future upgrade. To
visualize the timeline (mid-2024 to end-2025): Jul 2024: ECC publishes
Q2 2024 roadmap -- priorities are Zashi 1.x releases, finishing Dev Fund
proposals, Hybrid consensus R&D phase 2 done . Aug 2024: Zooko joins
Shielded Labs, announces push for PoS Crosslink and Zcash Sustainability
Fund . Nov 2024: Second Zcash Halving occurs (block reward from
6.25→3.125 ZEC). Dev fund mechanism continues under ZIP 1014 pending new
arrangements. Nov 2024: Zcash + Flexa integration launched -- Zashi
wallet can pay at thousands of merchants via Flexa network . Dec 2024:
QEDIT conducts ZSA public demo and testnet (Orchard assets, swaps). OKX
and some exchanges delist ZEC at year-end due to compliance. Jan 2025:
ECC "Onward to 2025" Summit -- sets NU7 target for Oct 2025, confirms
focus on new stack and ZSAs . Feb 2025: New ECC CEO (Josh Swihart)
officially in place; ECC releases Q1 2025 roadmap update emphasizing NU7
and Zashi 2.0 plans . Apr 2025: Zashi 2.0 released with major UX
enhancements ; Brave browser adds shielded ZEC support (v1.77) .96 106
107 108 • 96 • 90 1 • • 109 110 • • 1289 • 111 • 19 112 9

May 2025: Zcash Community Forum and ECC blogs discuss removing t-addrs
from UAs; Zashi 2.0.3 implements shielded-only addresses . ECC publishes
"Zcash + Maya" -- ZEC now on Maya DEX, plans to integrate into Zashi .
July 2025: Zcash devs joint roadmap published (18-month outlook) ; ECC
Roadmap Q3 2025 update reaffirms quarterly adaptive planning . Community
Grants Committee (ZCG) re- appointed or refreshed around this time (as
terms are usually yearly). Aug 2025: Zashi 2.1 with Tor goes live in
beta . Testing of NU7 components (ZSA, Zebra) on testnet likely
underway; Zcon annual conference (Aug 2025) features demos of ZSAs and
talks on governance. Oct/Nov 2025 (Projected): NU7 activation on mainnet
-- enabling ZSAs, requiring new node software. If on schedule, Zcash
gains ability to privately transfer user-defined assets and possibly
other features like memo improvements. This timing may adjust if audits
or testing reveal issues. Beyond 2025: Work shifts to Crosslink PoS
testnets and subsequent upgrade (NU8) and to any further enhancements
like Shielded Lightning (scaling) or improved compliance features if
needed. The roadmap is not without risks. ECC acknowledges it's "not
fixed, not rigid" -- development could be re-tuned if, say, revenue
drops or an unexpected regulatory event happens. For example, if a law
outright banned mining or privacy coins in a major jurisdiction, the
community might accelerate PoS or introduce new compliance modes (like
optional address tagging) to adapt. On the other hand, positive external
factors (like a bull market increasing funding) could allow more
parallel initiatives (perhaps revisiting programmability on Zcash). Key
dependencies include the results of audits (a critical bug in ZSA
circuits could delay NU7), the performance of Zebra node in real-world
conditions, and community consensus on changes (especially PoS, which
could be contentious). Zcash's leaders seem prepared with a Plan B for
some scenarios -- e.g., if centralized exchanges all delist ZEC, the
Maya/Thorchain integration ensures ZEC remains liquid and usable on DEXs
. In summary, Zcash's direction is charted toward greater functionality
(assets, cross-chain), greater self- sufficiency (community-run
infrastructure replacing Bootstrap's zcashd), and greater
decentralization (staking, improved governance). Milestones are clearly
defined for the next year , and while execution challenges exist, the
alignment between ECC, Zcash Foundation, and other contributors is
reportedly at an all-time high . The community is cautiously optimistic
that Zcash can "have it all": top-tier privacy, broader utility, and
compliance where needed -- but the next year will be crucial in
delivering on these promises. Zcash Shielded Assets (ZSAs) & Terminology
One of the most anticipated Zcash features is the introduction of Zcash
Shielded Assets (ZSAs) . This refers to the capability for users to
issue and transact custom assets/tokens on the Zcash network with the
same privacy protections as ZEC. In other words, ZSAs would be analogous
to ERC-20 tokens on Ethereum or tokens on Omni, but all transfers occur
in Zcash's shielded pools, meaning amounts and asset types can be kept
confidential. The term "ZSA" is the official one -- sometimes community
members have used "Zcash Layered Shielded Assets" or other variations,
but "Zcash Shielded Assets (ZSAs)" is the correct name per the project
documentation and ZIPs . Each ZSA represents a distinct asset (e.g. a
stablecoin, a stock, a reward token) and would be identified by an asset
identifier (likely a byte string or integer). ZIP-317/ZIP-318 in the
proposals repository cover the memo field extensions needed, while
ZIP-226 and ZIP-227 cover the core protocol changes for ZSAs . Purpose
and Rationale: ZSAs aim to expand Zcash from a single-asset chain (just
ZEC) into a platform supporting private digital assets of any kind .
This could include private stablecoins (e.g. a shielded USD token),
privatized wrapped assets (like shielded Bitcoin via a bridge),
community loyalty tokens, or• 113 38 9114 • 98 115 • 21 • • 99 10116 98
117 118 10

even NFTs (non-fungible tokens, though those are conceptually possible
by treating each token as unique series). The design motivation was to
leverage Zcash's battle-tested privacy for broader DeFi and financial
applications. Currently, if someone wants a private USD stablecoin, they
have limited options (e.g. using a privacy layer on Ethereum such as
Aztec, which has had issues). ZSAs on Zcash could fill that gap: imagine
a USDC-like token that can be sent with full anonymity on-chain. Another
use case is enabling DEX functionality directly. With multiple assets
existing under the hood, Zcash could facilitate atomic swaps between
assets, enabling a sort of decentralized exchange within the chain.
QEDIT's proposal indeed includes supporting Atomic Asset Swaps as a
native feature with ZSAs . This would make trustless trades possible
(for example, swapping a ZSA stablecoin for ZEC entirely on-chain,
privately). Status (Research, Testnet, etc.): As of August 2025, ZSAs
have not yet launched on mainnet but are very far along. The development
was funded by a Zcash Foundation grant in 2022, and by April 2023 the
QEDIT team had a working implementation on their private branches . They
integrated this into a custom Zcash node (modified zcashd and Zebra) and
ran internal tests. A public demo was shown in December 2024 (the Zcash
Foundation hosted a demo call where QEDIT demonstrated issuing and
swapping assets on a test network ). The implementation comprises
modifications to Zcash's circuit -- essentially extending the Orchard
circuit to include asset identifiers and asset value commitments . In
practice, a ZSA transaction proves not only that total value is
conserved (as ZEC does) but also that the vector of different asset
types is conserved (or that new assets are properly minted/burned
according to rules). ZIP-227 outlines the issuance rules: for example,
an issuance could be controlled by a signature (so only the issuer can
mint more of a token), or it could be a "fixed supply" token. These
rules need to be set at the asset's creation. By mid-2025, QEDIT
reported that the ZSA code was nearly ready for audit, and indeed an
external security audit was being arranged (likely with a firm like NCC
or Trail of Bits). Assuming audits find no showstoppers, the plan is to
include ZSAs in the next network upgrade (NU7). On the testnet timeline
: A specialized ZSA testnet (sometimes called "Zebra ZSA testnet") was
expected in 2025 once Zebra and ZSA code were merged. The Zcash
Foundation indicated they would spin up a test network in advance of NU7
to let wallet developers and integrators play with ZSAs in a realistic
setting . It's possible by the time you read this, that testnet is live
or imminent. UX and Dev Implications: Introducing assets adds
complexity. For one, addresses need to handle multiple asset types.
Zcash's Unified Address approach actually helps here: an Orchard
receiver already can technically handle any asset, because the note
value now will have an asset identifier . In terms of wallet UX, users
will need a way to see different balances (ZEC vs other tokens) and
perhaps choose which asset to send. ZSA designs intend to keep the
privacy UX consistent -- i.e. a shielded address can hold multiple
assets and the user sees a list of assets in their wallet. Zecwallet
Lite (third-party wallet) had prototyped an interface for ZSAs in 2022
(with test asset "ZECt" etc.), so wallets are aware of what's coming.
Lightwalletd (the server that wallets use) will also be updated to
handle fetching notes of different assets. Another implication is fees:
How are transaction fees paid when sending a ZSA? The current thinking
is fees will continue to be paid in ZEC (the native asset), not in each
token. This means if you send, say, 100 "ZUSD" tokens, you might include
an extra 0.0001 ZEC as fee (and that 0.0001 is burned from your ZEC
balance). This requires that almost all users hold at least a little ZEC
to fuel transactions, similar to how Ethereum requires ETH for gas even
if you're sending an ERC-20 token. It's possible in future the protocol
could allow fee in any asset (some chains do this via fee swapping
markets), but initially ZEC as fee is simplest. From a developer
perspective, those writing wallets or tooling need to be ready to parse
new transaction data : each shielded note will carry an asset identifier
. The viewing keys and decryptions will yield (asset, amount) pairs
rather than just amounts of ZEC. Block explorers and monitoring tools
will also need updates to identify which asset is being transferred
(though note, everything is shielded, an explorer can't see inside a
shielded tx, but it can see85119 120 121 80 11

the presence of different asset IDs if the transaction is partially
transparent or uses specific ops for issuance). Competitor/Comparison:
The concept of user-issued assets on a privacy chain is not entirely
new, but among major privacy coins, Zcash will be the first to implement
it with full shielding. Monero, for instance, does not support multiple
assets -- it focuses solely on XMR and has no token mechanism. The
Monero community hasn't shown interest in assets, partly to avoid
complexity and potential privacy leaks that multiple asset types could
introduce. Another project, Beam , a Mimblewimble-based privacy coin,
introduced Confidential Assets in 2020. Beam's assets are similar --
custom tokens that inherit MW's privacy -- but Beam's adoption and
ecosystem are relatively small compared to Zcash's. Zcash's approach
with ZSAs differs in technicals (Beam uses MW and Lelantus, while Zcash
uses zk-SNARKs with a shielded pool model). There's also Firo (formerly
Zcoin) , which has been exploring a tokenization layer with their
Lelantus Spark protocol -- but as of 2025, Firo's tokens are still
theoretical, and Firo's usage is modest. In the broader crypto world,
dozens of chains support assets/tokens, but they often lack privacy.
Ethereum has Tornado Cash and other mixers, but using an ERC-20
privately requires additional protocols that have proven fragile
(Tornado Cash was sanctioned and partly shut down). ZSAs could provide a
built-in private token capability on a base layer , which is unique. A
parallel might be Secret Network (a Cosmos-based chain with encrypted
contracts) which can have tokens with privacy, but it relies on trusted
hardware (enclaves) rather than pure math crypto, and Secret has had its
own adoption issues. It's also worth noting ZSAs will allow bridging
other assets into Zcash . One could create a "Wrapped ETH ZSA" by
locking ETH on Ethereum and issuing an equivalent ZSA on Zcash (if a
custodian or smart contract does so). This would let users hold and
transfer ETH (or BTC, etc.) with Zcash privacy. Thorchain/Maya
integration is tackling cross-chain swaps already, but ZSAs could enable
a more direct bridging (with the caveat of requiring trust in a
custodian or a more complex cross-chain protocol). Terminology Check --
"ZSA" vs others: The user prompt asked to disambiguate "ZLSA". To be
clear , ZSA (Zcash Shielded Asset) is the term used in ZIPs and by
ECC/QEDIT. We did not find any official use of "ZLSA"; it's possible
someone informally said "Zcash Layer-1 Shielded Asset" to emphasize it's
a layer-1 feature, but that's not standard. All official comms use ZSA.
Similarly, one might encounter "UDAs" (User-Defined Assets) in older
forum posts, but that was before ZSA became the settled name. In
summary, ZSAs are set to bring a new dimension to Zcash:
privacy-preserving asset issuance . The community is generally
enthusiastic, seeing this as boosting Zcash's utility and demand
(imagine if a popular stablecoin or CBDC ran on Zcash tech). However ,
there will be challenges: convincing issuers to use ZSAs, handling
regulatory aspects of private assets, and ensuring the added complexity
doesn't introduce vulnerabilities. Based on progress so far , Zcash is
on track to deploy ZSAs soon -- a move that could differentiate it
strongly in the privacy coin landscape, where Monero and others remain
single- currency systems. Ecosystem & Adoption Despite being a
privacy-focused project (or perhaps because of it), Zcash has built a
diverse ecosystem of wallets, services, and integrations. This past year
saw several positive developments in adoption, from new wallets to
merchant payment support, even as some centralized platforms pulled back
under regulatory pressure. Wallets: Users today have a range of options
to hold and use ZEC, many of which emphasize shielded transactions. On
mobile, aside from ECC's Zashi (Android/iOS, launched 2024), there are
community- 12

developed wallets like Nighthawk (Android/iOS) and YWallet
(Android/iOS/Desktop). Nighthawk, funded by Zcash Community Grants, has
been a long-standing shielded wallet that in 2023 added features like
multi-account support and integrated viewing keys. YWallet, a newer
entrant by developer Yigael, gained popularity in 2022--2023 for its
speed and support of both Sapling and Orchard shielded pools. Both these
wallets continue to operate and were quick to incorporate Unified
Addresses and Orchard post-NU5. There's also Edge Wallet , a multi-coin
wallet that was one of the first to support Zcash shielded on mobile
(Sapling pool) around 2020. Edge still supports ZEC, though its shielded
support hasn't been updated to Orchard yet. On desktop, Zecwallet Lite
(a community GUI wallet) was widely used until Zashi's arrival; it's
still functional and some users prefer its simplicity for PC use.
However , Zecwallet Lite's developer focused more on infrastructure
(lightwalletd improvements) in the last year , as ECC's official wallet
efforts ramped up. The Zcash Foundation has an experimental browser-
based wallet called ZGo (previously "Zeclet"), which uses zebra-node in
WASM to run a light client fully in-browser . In late 2024, they
showcased ZGo, hinting at a future where any device with a web browser
could send shielded ZEC without a trusted server . One highlight is that
hardware wallet support improved: by Dec 2024, ECC and the community
implemented Shielded Hardware Wallet support via the Keystone hardware
wallet. Keystone users can now sign Zcash shielded transactions by
scanning QR codes (since direct USB integration of shielded is complex)
. Zashi integrated this in version 1.3 (Feb 2025 for iOS) . Trezor and
Ledger , the two major hardware wallets, still only support Zcash
transparent addresses (no shielded) -- something the community has long
wanted to change. There's ongoing work (as of 2025) to enable Orchard
support in Ledger ; the blocker has been the proving circuits and
hardware limitations, but with Halo 2's efficiency and Ledger's new
devices, it's becoming more feasible. A \$15k ZCG grant was approved in
2024 to update Zcash support in BTCPayServer and other tools to use
unified addresses , which will help merchant adoption. Merchant and
Payment Integration: A major stride came via Flexa (now part of the Amp
ecosystem). In November 2024, Flexa and ECC announced integration of
Zcash into Flexa's point-of-sale app . Flexa is a digital payments
network accepted by thousands of retail locations (from coffee shops to
big-box stores). With this integration, users can spend ZEC through the
Zashi wallet at any Flexa- enabled merchant, and the merchant receives a
guaranteed payment in their currency (handled by Flexa) . Crucially, the
integration was done in a shielded-preserving way: Zashi uses Flexa's
SDK over encrypted channels, so when a user pays, the merchant sees a
regular currency transaction and does not gain any insights into the
user's Zcash address or history . This effectively made "Paying with
shielded ZEC" possible at mainstream stores for the first time. ECC's
CEO called it an "epic milestone" that brings real private spending to
everyday life . Early examples included spending ZEC at Starbucks, Whole
Foods, etc., through the SPEDN app using Zashi as the source. This
integration likely contributed to Zcash's narrative that privacy coins
can be used responsibly in commerce. Another integration is with Brave
Browser , as mentioned. Beyond just supporting shielded transactions in
the wallet, Brave also has a native Brave Swap feature and talks of
integrating privacy coins in their ecosystem (for instance, Brave's
search and ads could theoretically pay out in ZEC alongside BAT). While
no formal partnership on that front has been announced, ECC did engage
Brave in co-marketing around the wallet launch . For instance, Brave's
VP of Web3 said the integration "marks a major step forward for user
sovereignty" and ECC's CEO similarly lauded Brave's privacy stance .
This cross-pollination could attract new users to Zcash from Brave's 50+
million user base. In the decentralized realm, Zcash's presence on
Thorchain and Maya Protocol is a key adoption vector . Thorchain is a
cross-chain liquidity protocol (a decentralized cross-chain exchange).
For a long time, ZEC was not available on Thorchain, but a community
effort (led by projects like Maya, a Thorchain fork) changed that. In
May 2025, ZEC became live on Maya Protocol liquidity pools . This means
users122 18 123 124 125 126 109 110 127 128 110 129 130 76131 132 13

can swap ZEC for BTC, ETH, ATOM, etc., in a decentralized way, and even
do cross-chain payments (like sending shielded ZEC that arrives as
native BTC to someone). ECC is actively working to integrate this into
Zashi, calling it "Cross-Chain Payments": a user could choose an
external chain address as the destination and Zashi+Maya will handle
swapping their shielded ZEC to that asset and sending it . This is
slated for 2025 in the Zashi roadmap as a high-priority item. The
significance is huge: it essentially means Zcash can act as a privacy
hub for transferring value between chains. If you have BTC but want to
privately send it to someone, you could convert to ZEC, send shielded,
and have it come out as BTC via Thorchain -- all non-custodially. The
Maya + Zcash partnership is driven by aligned values (privacy +
decentralization) , and provides resilience if centralized exchanges
become hostile to ZEC . Exchanges and Custody: On traditional exchanges,
Zcash's listing situation is mixed. ZEC remains listed on major global
exchanges like Binance, Coinbase, Kraken, Gemini, Huobi, KuCoin and
others. However , certain jurisdictions have seen delistings: for
example, in mid-2023 some exchanges in South Korea delisted privacy
coins due to FATF travel rule compliance. Europe's largest exchange,
Bitstamp, stopped trading ZEC in 2020 (in the US market), but still
allows withdrawals. The Binance saga in 2023-- 24 was closely watched.
Binance had initially tagged ZEC with a "monitor" label and in June 2023
reportedly reconsidered delisting in some regions , but after community
engagement (and possibly because ECC worked on compliance features like
the exchange-only address), Binance did not delist ZEC globally as of
2024. Instead, Binance implemented restrictions: for example, Binance
will not accept deposits that come directly from shielded addresses (the
deposit is fine if it's from a t-address, which ECC accommodated via the
new address type ZIP-320). It appears the Zcash community's efforts paid
off in this case -- by providing exchanges the tools to segregate
shielded funds if they choose, ZEC avoided a blanket ban on Binance . In
the UK, exchanges like Coinbase UK halted ZEC trading in 2019 due to
regulatory guidance, but in the US and most of the world, Coinbase
continues to support Zcash . Gemini, as mentioned, has been a strong
supporter: it was the first exchange to enable shielded ZEC withdrawals
back in September 2020 . Gemini's tagline was that users could withdraw
to a shielded address for "an added layer of financial privacy within a
regulated framework" . This feature is still available on Gemini and was
highlighted by Zcash community as a positive example of compliance and
privacy coexisting. Kraken also allows shielded withdrawals (Kraken
added support in 2021 quietly, capping at 1 ZEC per withdrawal if
shielded to manage risk). These moves by reputable exchanges provided
talking points to counter the narrative that "privacy coins =
non-compliant." On the custody side, there's growing institutional
interest in privacy coins for high-net-worth individuals. In 2024, some
custody providers (like Fireblocks, Anchorage) started offering ZEC
support, at least transparent. As multi-party computation (MPC) tech
improves, we may even see shielded custody (MPC could allow a custodian
to manage shielded keys in fragments). Nothing concrete on that yet, but
ECC's transparency reports mention engagement with custody providers to
ensure ZEC is supported. Tools and SDKs: Developers looking to build on
Zcash have access to official SDKs: Zcash Android SDK and Zcash iOS SDK
, maintained by ECC, provide high-level APIs to create shielded
transactions, manage wallets, etc. ECC in fact built Zashi on these
SDKs, and they open-sourced Zashi's code (on GitHub) for reference . The
SDKs were updated in 2024 to support Unified Addresses and Orchard.
Lightwalletd, the backend service that wallets use to fetch compact
block filters, was improved for performance (ZF ran community instances
to decentralize reliance on ECC's server). A notable tooling
improvement: a block explorer that shows shielded pool usage . While
shielded details can't be seen, explorers like ZecPages created stats on
how many shielded outputs per block, etc. The Zcash Foundation also
funded a project for an analytics tool that tracks shielded adoption
(with privacy-respecting methods). This reflects a desire to better
measure success without compromising privacy.114 133 10 10116 134 5 135
136 137 138 14

Collaborations and Grants: Several partnerships and collaborations have
bolstered the ecosystem. We already covered Flexa, Brave,
Thorchain/Maya, and hardware wallets. Another collaboration: Keystone
(hardware wallet) worked closely with ECC to get shielded QR signing
right by Christmas 2024 -- a sprint the ECC team pulled off with long
hours. Also, ECC mentioned working with Coinbase on co- marketing
initiatives in early 2025 . This might involve educational content or
perhaps Coinbase considering shielded withdrawals (Coinbase hasn't done
it yet, but if Gemini can, pressure might build). Zcash Community Grants
(formerly MGRC) played a big role in 2024--2025. They funded projects
like Zcash Media , which produces high-quality explainer videos about
Zcash's tech and ethos, reaching a broad audience. They also supported
academic research (e.g. a University study on Zcash usage patterns) and
other community tools. One interesting grant was to the Tor Project for
Arti, as mentioned, which directly benefited Zcash by strengthening Tor
integration . Aspirational vs Shipping: It's important to note which
things are actually delivered versus still promises. On adoption, a lot
of positive developments shipped : shielded mobile wallets, Brave
support, merchant payments via Flexa, DEX access via Maya, hardware
wallet partial support. Aspirational items include deeper exchange
integration (e.g. getting more exchanges to do shielded withdraws like
Gemini -- that's a work in progress). The "Holy Grail" would be an
exchange accepting shielded deposits , but that seems far off due to
compliance issues (Binance explicitly wanted to prevent that). Instead,
the community shifted focus to ensuring Zcash can be used without
centralized intermediaries if needed. One somewhat aspirational project
is Zcash Shielded Assets adoption -- by itself a tech feature, but its
success will depend on partners issuing assets. We might see stablecoin
issuers, like perhaps an independent project launching a private USD on
Zcash, or existing coins bridging over . ECC and ZF might proactively
approach stablecoin providers once ZSAs are live. Community & Grassroots
Adoption: Zcash has an active community that pushes grassroots adoption.
"Zcash Zeal" meetups were held in various cities in 2024 (educating
people on using ZEC privately). Zcash got integrated into some online
services: for example, some content creators on platforms like OnlyFans
or Patreon began listing Zcash (via BTCPay) as a payment method for fans
who want privacy. The nonprofit RightsCon 2024 featured Zcash in panels
about financial privacy for activists. So beyond pure numbers, Zcash
maintained a presence in the narrative around privacy rights. In
quantitative terms, the number of shielded transactions per day reached
all-time highs several times. In July 2022, fully-shielded tx per day
hit \~9,600 (a massive jump from 2020 levels) . It's likely that in
2024/2025, with wallets like Nighthawk and Zashi defaulting to shielded,
a majority of user transactions (by count) are shielded. However , a lot
of on-chain activity still comes from mining payouts and exchange
deposits/withdrawals which are transparent. As a metric, the Shielded
Pool Value (percentage of all ZEC in shielded addresses) grew to \~20%
in 2025 as noted , which is a concrete sign of adoption. In conclusion,
Zcash's ecosystem in 2025 is robust and growing in the directions that
matter: easy-to- use shielded wallets, ways to spend ZEC for real goods,
decentralized trading options, and active developer tools. There have
been setbacks (some exchanges saying goodbye, still no shielded Trezor ,
etc.), but the momentum from the community and ECC's efforts is
tangible. The strategy is clearly to integrate wherever possible -- web
browsers, retail payments, DeFi bridges -- so that ZEC can be used
privately in as many contexts as possible. If ZSAs succeed, the
ecosystem could see entirely new participants (like projects issuing
tokens or DeFi applications using Zcash as a privacy layer). For now,
the foundation has been laid and the signs point to a steadily expanding
adoption curve for shielded ZEC.139 140 73 141 142 57 15

On-Chain & Network Health Zcash's on-chain metrics present a story of
gradually increasing privacy adoption amid a stable but evolving
network. Key indicators include shielded vs transparent usage,
transaction volumes, fees, hashrate distribution, and the size of the
anonymity set. Shielded vs. Transparent Usage: The share of transactions
that involve Zcash's shielded pool has been steadily rising. Back in
early 2020, only \~14--15% of transactions had any shielded component .
By contrast, today a much larger portion does -- though exact current
percentages aren't straightforward to measure (since fully shielded
transactions are not visible individually). One clear metric: as of July
2025 about 20% of the total ZEC supply is held in shielded addresses .
This is a substantial increase from \~6% in mid-2020 and a mere \~4% in
2017 . It indicates that more users are choosing to store ZEC privately
long-term. Some of that growth came after the NU5 (Orchard) launch, as
unified addresses made shielding easier , and also after large mining
pools began using shielded coinbase (post-Heartwood 2020) to directly
mine into shielded pools. Another metric is the count of fully-shielded
transactions (z→z) per day. This hit a record of 8,700 in April 2020 (6%
of total txs that month) . By July 2022, fully-shielded tx were
reportedly around 9,600 per day . Given increased usage via mobile
wallets, we can infer the number in 2025 is likely even higher on peak
days -- perhaps on the order of tens of thousands per day. The
proportion of blocks that contain at least one shielded transaction has
also grown. In mid-2020, \~8.8% of blocks had a shielded tx ; by now
it's common to see many blocks with shielded outputs, especially as most
wallet transactions from users are shielded by default. However , a
majority of transactions (especially exchanges batching withdrawals,
miner payouts, etc.) still occur transparently. Zcash's average daily
transaction count in 2025 ranges widely (in bull markets it peaked above
20k/day, in quiet times maybe 5k/day). If we estimate 15k tx/day and
perhaps \~20--30% have shielded inputs/outputs, that's thousands of
shielded-involving transactions daily. So while Zcash is not "fully
shielded" yet, usage of privacy features is at an all-time high in
absolute terms. The anonymity set for shielded ZEC is large and
continuously growing. Unlike Monero, which has a ring-based anonymity
per transaction, Zcash's anonymity set is effectively "all other
shielded coins in the pool." Currently, any output in the Orchard pool
is anonymous among millions of other outputs minted since May 2022.
Chain analysis companies like Chainalysis have acknowledged that when
Zcash is used with shielding properly, it's extremely private -- they
noted they could only trace \<0.5% of ZEC transactions fully (the rest
either originate or terminate in a shielded pool, breaking the link) .
Chainalysis in 2020 reported "less than 1% of ZEC transactions are
completely shielded" , but that was at a time when most usage was
t-address. The figure is surely higher now (though still a minority).
Importantly, even transactions that are not fully shielded can add to
privacy -- each shielding (t→z) or deshielding (z→t) acts like a mixer
where the shielded pool is the mixing barrel . The larger that barrel
(in volume and activity), the better . One caution: Research (like the
2020 RAND Corporation and others) found that certain usage patterns (for
example, very quick shielding then deshielding) could reduce the
effective anonymity set . If a user shields and then immediately
deshields the same amount, someone watching could guess linkage with
statistical analysis. However , as shielded volume grows, these
heuristic attacks get harder , because there are many plausible sources
for any given deshielding. The Zcash community often encourages users to
shield funds and leave them for a while (achieve "transaction
homogeneity") to increase ambiguity. The addition of Unified Addresses
and auto-shielding in wallets like Zashi also means more users are
shielding by default, not as an unusual action. This "organic shielding"
improves the overall privacy health of the network.30 57 34 143 144 145
142 146 2734 41 147 41 16

Transaction Volume & Throughput: Zcash's on-chain transaction throughput
has been well within network capacity. With \~75-second blocks and a 2MB
cap (post-Blossom, effectively 1MB every \~75s), Zcash can handle dozens
of transactions per second. Actual usage is far below that (a few tx per
second at most). For example, in Q1 2025 total on-chain volume was
reported as around \$29 billion . This was a 9% YoY decline, possibly
reflecting quieter markets. By comparison, Dash did \$12B in the same
period -- Zcash still sees higher on-chain volume than some peers, but
Monero typically sees even more on-chain volume than Zcash (owing to its
use in certain markets). Zcash's average fees per transaction remain
extremely low (0.0001 ZEC is the default fee, only \~\$0.003 at mid-2025
prices). Unlike Bitcoin or Ethereum, Zcash has not experienced fee
pressure or block space contention. The devs have discussed moving from
a fixed fee to a feerate to better handle future congestion, but until
usage spikes dramatically, the fee market is basically flat. In fact, a
ZIP-317 was proposed to raise the default fee tenfold (to 0.001 ZEC) to
deter spam and prepare for larger transactions like those including ZSAs
. But any change would be modest and still keep fees low in USD terms.
In short, network capacity and fees are healthy -- Zcash can scale to
far more users than it currently has, especially with planned
improvements (Halo allows future batching etc.). One metric of network
health is active addresses . Transparent addresses have Bitcoin-like
behavior , so there can be many one-time use addresses. Shielded
addresses (especially Orchard unified addresses) tend to be static per
user wallet (though Zashi now rotates a new one each receive, which can
increase count). Active address counts in Zcash are tricky to interpret
due to UAs. Nonetheless, block explorers recorded on the order of tens
of thousands of active addresses in recent months, which suggests a
small but stable user base (for context, Bitcoin has \~1 million active
addresses in a day, Monero maybe \~30k). Zcash's number is likely in the
same ballpark as Monero's, though slightly less, given Monero's larger
market cap and longer default privacy usage. Still, these figures should
be taken with a grain of salt, as shielded usage obscures actual unique
users. Hashrate and Mining Distribution: Zcash's hashrate as of 2025 is
dominated by specialized ASIC miners (Equihash ASICs). The network
hashpower has hovered around a few GW (giga-solutions per second) in
2024--2025. One concerning event was in September 2023 when the mining
pool ViaBTC briefly exceeded 50% of total hashrate . This raised the
specter of a 51% attack (though none occurred). In response, other pools
and miners likely adjusted -- and exchanges like Coinbase took
precautionary measures (Coinbase temporarily put ZEC in limit-only mode
when ViaBTC was at \~60% to prevent any double-spend attempts) . The
incident passed without damage, and ViaBTC's share later fell below 50%.
Currently, mining distribution is such that no single pool consistently
has \>50%, but the top three pools (likely ViaBTC, F2Pool, and Binance
Pool) make up a large majority. Efforts to encourage decentralization
have included reaching out to miners to diversify and even talk of
eventually moving away from PoW (as noted earlier with PoS plans). There
haven't been known successful 51% attacks or major reorganizations on
Zcash, and overall the network security from hashrate is strong
(Equihash ASICs don't have much else to mine besides Zcash and its few
forks, so there's alignment of incentive). The upcoming shift to hybrid
PoS will, if implemented, further secure finality and reduce reliance on
any one mining entity. Node Decentralization: Zcash historically relied
on the zcashd node, and many users simply used light clients. The number
of fully validating nodes has not been very high (some estimates were in
the low thousands globally). With Zebra coming online, hopefully more
diversity in node implementations will increase resilience. As of 2025,
some exchanges and services run Zebra nodes as a sanity check alongside
zcashd. ECC and ZF have been running many test nodes of the new stack. A
welcome trend is community members running lightwalletd instances -- to
reduce reliance on ECC's default server . For instance, Nighthawk runs
their own lightwalletd, and other volunteers do too. 148 148 37 149 150
17

Shielded Pool Migration and Turnstile: By design, all Sprout pool funds
had to migrate to Sapling (or beyond) by a certain point. In the Canopy
upgrade, the remaining Sprout value (which was very small) could no
longer be spent directly -- effectively "turnstiling" any value out of
Sprout had to go through an on-chain migration that was visible. At this
point, Sprout pool is practically empty , eliminating earlier concerns
of an "toxic waste" exploitation from Sprout's setup. The Sapling pool
still holds funds, but new usage is mostly orchard since NU5. There was
no forced migration from Sapling to Orchard (and none planned; Sapling
remains secure albeit with the old proving system). However , we observe
user behavior: as wallets phase out Sapling addresses in favor of
unified addresses, the Sapling pool usage will gradually decrease.
Orchard pool had grown to hold several million ZEC worth of value by
2025 (including notional value of all shielded assets, which in this
case is just ZEC until ZSAs arrive). This suggests success in getting
users to adopt the latest tech. Privacy Set Considerations: One point
often discussed is the "effective anonymity set" . While theoretically
all shielded coins mix, in practice patterns can reveal something. For
example, if only a handful of users shield large amounts at certain
times, an observer might guess which output is whose if they later
deshield similar large amounts. The Zcash Foundation and academic
partners have been researching these patterns. So far , no practical
de-anonymization attack has been demonstrated on Sapling or Orchard
transactions at scale. The best that analytic firms do is flag whether
an exchange deposit might have come from a shielded source, but they
can't prove it. As ECC noted, even Chainalysis supporting Zcash meant
essentially they support tracking transparent ZEC and maybe shielded
entry/ exit points, but they cannot crack shielded internals . It's
often cited that "Zcash privacy remains the strongest of any
cryptocurrency" when used properly , which is backed by third- party
analysis too (like the RAND report in 2020 that found no evidence of
large illicit use, partly because criminals likely prefer easier methods
like Bitcoin's obfuscation or Monero over figuring out shielded ZEC,
which speaks to its effectiveness) . Network Fees & Economics:
Transaction fees on Zcash are negligible in terms of impacting network
health (the block reward dwarfs fees, so miners mine purely for block
subsidy). One economic aspect to watch is the inflation rate . Zcash's
inflation (issuance rate) was higher than Bitcoin's for the first 8
years; after the second halving in Nov 2024, ZEC's inflation dropped to
around 6.25% annually and will fall to \~3% after the third halving.
High inflation was often criticized as putting sell pressure on ZEC's
price. Indeed, Zooko cited this as a reason to accelerate PoS (which
could indirectly reduce selling, as holders stake instead of miners
selling) . The halving in 2024 was a healthy event -- it also meant the
original Dev Fund expired. However , block rewards (with dev fund)
continued, so miners currently get 80% of 3.125 = 2.5 ZEC, and 0.625 ZEC
is split to ECC/ZF/ZCG, each block . This funding is vital for
development and appears secure for now, but as ZEC's price fluctuates,
the USD value can vary. A risk for network health is if ZEC's price is
too low, miners could drop out (though current ASIC miners have limited
alternatives, so they are likely to stay as long as revenue covers
electricity). At mid-2025 prices (\~\$30/ZEC), mining is not enormously
profitable but continuing. The plan to move to hybrid PoS could also
economically benefit ZEC by introducing staking yield and reducing miner
sell pressure, as noted. Node Count and Resilience: Zcash doesn't have
an easy way to count nodes (no DNS seeder that publishes count openly).
But we can note that since Zcash uses the Bitcoin networking stack, its
nodes propagate transactions and blocks similarly. With two
implementations (zcashd and zebra), the hope is that a bug in one won't
take down the whole network. In late 2022, there was an incident where a
bug in zcashd's mempool logic caused many zcashd nodes to crash when a
particular invalid transaction was broadcast. The network kept running
(some miners and Zebra nodes stayed up) and ECC quickly patched zcashd .
This incident underscored the need for multiple node implementations --
which by 2025 is now reality with Zebra's readiness.26151 152 153 154 92
155 156 139 18

Hashrate Trend: Over the past year , Zcash's hashrate saw some decline
as a function of price declines (as did many PoW coins). However , it
also had big miners like Bitmain throwing new ASICs at it occasionally
(Bitmain released an Equihash ASIC update in 2022, which boosted
hashrate). The ViaBTC takeover alarm in 2023 suggested maybe not enough
independent miners were active. Since then, community advocacy (and
possibly some improvement in distribution) happened. If Crosslink comes,
mining will gradually diminish in importance, but until at least 2026,
PoW secures Zcash. Mining distribution remains a centralization pain
point -- many privacy coin projects face it (Monero moved to
ASIC-resistant PoW to keep mining decentralized among CPUs, at cost of
efficiency; Zcash chose performance via ASICs but got fewer
participants). The solution might indeed be PoS where decentralization
is determined by coin distribution (which one hopes is more
decentralized than mining rigs distribution -- though that's debatable).
In conclusion, the network health indicators show a chain that is secure
and under capacity, with improving privacy metrics. Shielded usage is
trending up , making the network's core value proposition stronger over
time. There are areas to monitor: mining centralization until PoS
mitigates it, and ensuring that as more features (like ZSAs) arrive, the
chain continues to operate smoothly. So far , Zcash has displayed strong
technical resilience -- no major downtime, no exploits, upgrades
executing successfully -- albeit at the cost of complexity that only a
few teams can manage. The community's move toward more decentralization
in development (multiple teams) should help network health as well,
spreading expertise. Overall, Zcash's on-chain privacy set is growing in
strength, and with transaction fees low and capacity ample, it is
well-positioned to onboard more users without disruption. Governance,
Funding & Institutions Zcash's governance and funding structure is
unusual among cryptocurrencies, blending corporate, non- profit, and
community elements. Understanding the roles of Electric Coin Co. (ECC),
the Zcash Foundation (ZF), and the Zcash Community Grants committee
(ZCG) is key to appreciating how the project is steered and financed.
Development Fund Mechanics: Zcash was the first major coin to institute
a Founders' Reward -- from 2016 to 2020, 20% of each block reward went
to the early investors, founders, ECC employees, and a slice to the
Zcash Foundation. This was controversial but provided ECC with funding
to develop the protocol. The Founders' Reward expired at the first
halving (Nov 2020). Anticipating that, the community engaged in a long
debate in 2019 over "Dev Fund or no Dev Fund." The result was a wide
consensus in favor of continued funding (albeit not to founders, but to
ongoing development) . This led to ZIP 1014 , which established the
Zcash Development Fund (2020--2024) . ZIP 1014 allocated 20% of block
rewards for the next 4 years as follows: 8% to the Major Grants fund
(for independent third-party projects, managed by a committee), 7% to
ECC , and 5% to Zcash Foundation . The remaining 80% of block reward
continued to go to miners . This arrangement became active with the
Canopy upgrade (block 1,046,400) and was locked in as consensus rules.
Through this Dev Fund, ECC and ZF have had guaranteed funding. For
example, at a price of \$50/ZEC, ECC's 7% yield equated to roughly
36,000 ZEC per year (a few million USD), and ZF's 5% a bit less. The
Major Grants slice (8%) was significant -- it formed the treasury that
the Zcash Community Grants committee oversees. From 2020 to late 2024,
this Major Grants fund accumulated thousands of ZEC, which ZCG has been
spending to fund ecosystem projects. As of the second halving (Nov 2024)
, ZIP 1014's time-bounded mandate reached its term. The assumption was
that the community would decide on a new ZIP to govern block rewards
moving forward. Several proposals were floated, ranging from "let miners
have 100%" to "continue 20% dev157 158 54 155 19

fund with new allocations" to "increase dev fund." One prominent idea by
ZF's Josh Cincinnati (2019) was to create an Endowment or Sustainability
Fund that could invest or hold reserve for the long term . By 2023, this
evolved into the notion of an Unissued Reserve -- essentially, taking
some of the yet- to-be-mined coins and earmarking them for developer
funding without relying solely on continuous block rewards . However ,
as halving approached, it became clear a full community polling and ZIP
ratification might not be finished in time. Zooko's Medium post in Aug
2024 announced the plan to implement the "Zcash Sustainability Fund"
promptly , implying ECC and Shielded Labs would push for it. If the ZSF
were implemented, it likely means a portion of each block (or a one-time
carve-out of total supply) goes into a fund governed by some entity. But
details needed hashing out: who controls it? (Some suggested a
multi-signature with ECC, ZF, community reps -- which was called NSM,
perhaps "Network Security Multisig" -- as hinted by a forum note that
ZSF was renamed NSM, to improve understanding .) At present (Aug 2025),
no new Dev Fund ZIP has been formally activated . The simplest outcome
was to extend the 20% dev fund status quo until a change is agreed. In
fact, unless changed, the consensus rules from Canopy continue those
block reward splits indefinitely (ZIP 1014 did not have an automatic
sunset, it just stated it's intended until 2nd halving -- but
technically the code would keep it going). If so, ECC, ZF, and ZCG are
still getting the same percentages post-halving. This seems to be the
case in 2025: ECC and ZF have not reported any funding cliff, suggesting
block reward funding is continuing for them at least temporarily.
Meanwhile, the community is likely to revisit and finalize a new
arrangement via a ZIP. It's possible that ZIP will maintain the 20% but
adjust allocations (for instance, Shielded Labs might get a piece, or
the ECC/ZF split might change if ECC's needs drop or ZCG's increase).
Some in the community argue ECC should eventually be entirely
grant-funded rather than block-funded, but currently ECC relies on the
block reward for the bulk of its budget (supplemented by its ZEC
reserves from earlier). The Zcash Foundation's share (5%) has helped
them grow and support independent dev like Zebra. Electric Coin
Co. (ECC): ECC is the for-profit company (though actually donated to a
non-profit entity Bootstrap in 2020) that created Zcash. It has a
public-benefit ethos despite being for-profit. In Dec 2020, ECC's owners
donated ECC's equity to the Bootstrap Project (a 501(c)3) , making ECC
wholly owned by a non-profit. This was done to align ECC's incentives
with the community (no shareholders expecting profit). ECC's role is to
develop the core protocol and now also to develop user products (like
Zashi). It works under the Zcash trademark agreement with ZF -- meaning
neither can unilaterally change the protocol's name or consensus without
the other's approval . ECC publishes Transparency Reports quarterly
detailing how they spend funds . For example, they report salaries, R&D,
etc., and ZF similarly publishes financial statements. ECC's
relationship with the community is guided by the "ECC Principles"
(cypherpunk values, transparency, etc.), which they often reiterate at
events. With the leadership change (Josh Swihart as CEO), ECC has
indicated a recommitment to being agile and collaborative . They invite
community devs to their planning sessions, and the Z\|ECC Summits are
meant to include external participants. This shows a shift from earlier
days when ECC might have been seen as unilateral -- now there's more
multistakeholder input. Zcash Foundation (ZF): ZF is an independent
non-profit founded in 2017 to support the Zcash ecosystem. It has its
own board (currently chaired by Andrew Miller , a well-known crypto
academic, with members from the community) and mandate. ZF's major
achievements include developing the Zebra node (written in Rust),
running community programs (grants, hackathons), legal advocacy for
privacy, and serving as a balance to ECC in governance. The Foundation
is funded partly by the dev fund (5% of blocks) and partly by donations
(it received some share of Founders' Reward early on too). As of 2025,
ZF has substantial reserves (they have held a lot of ZEC from their
allocation, and likely diversified some103 103 104 159 105 160 55 161
99101 20

to USD to fund operations). ZF's annual budget supports a team of
engineers (leading Zebra devs), grant program managers, and policy
folks. ZF's role in governance is significant due to the Zcash trademark
. In 2020, ECC and ZF signed an agreement that the Zcash name and
branding is controlled by ZF, but licensed to ECC. Importantly, any
network upgrade must be "endorsed by both ECC and ZF" to be called Zcash
. This prevents one org from forking Zcash and calling it Zcash without
consensus. If ECC and ZF ever disagreed strongly, the trademark could
come into play -- but so far , they've worked in tandem or at least
managed differences quietly. ZF also administers the Zcash Community
Advisory Panel (ZCAP) . ZCAP is a group of long-time community members
and stakeholders who are polled for their sentiment on major issues. For
instance, ZCAP votes influenced the dev fund outcome in 2019 (they
ranked proposals) , and in 2022, ZCAP was consulted on priorities like
PoS. While ZCAP votes are non-binding, they offer a gauge of community
will beyond Twitter noise. The Foundation has advocated for even more
community inclusion -- exploring things like quadratic voting or
coin-weighted voting for some decisions, though coin-weighted is
controversial due to privacy (hard to prove coin ownership without
revealing identities). Zcash Community Grants (ZCG): Originally called
the Major Grants Review Committee (MGRC), this is a community-elected
committee that manages the 8% block reward slice for grants. The MGRC
was established by ZIP 1014 with the idea to fund independent projects
that advance Zcash. In practice, this has funded wallets (Nighthawk,
YWallet), infrastructure (block explorers, lightwalletd improvements,
Tor integration), outreach (Zcash Media, meetups), and major R&D like
QEDIT's ZSA work . The committee members are elected (initially five
individuals) for one-year terms by the ZCAP or community vote. In 2022,
MGRC rebranded as Zcash Community Grants (ZCG) to better reflect its
mission. ZCG operates within the Zcash Foundation (the Foundation's
board has final say to ensure funds aren't misused, but they generally
defer to ZCG decisions). ZCG's challenges have included ensuring they
get enough high-quality grant applications and that funded projects
deliver . Some grant projects struggled or pivoted, but many delivered
great value (like the Tor Arti project). ZCG's budget also ballooned as
ZEC price spiked in 2021 then fell; they manage a treasury and have to
plan multi-year funding for big grants. In 2024, for example, they
approved a large grant to Shielded Labs to support Crosslink development
-- since Shielded Labs is independent of ECC, ZCG can fund it directly.
They also consider grants for things like marketing or community growth
which ECC or ZF might not prioritize. Decision-Making Processes:
Formally, Zcash protocol changes are proposed as ZIPs (Zcash Improvement
Proposals) . ZIPs can be written by anyone, but in reality most come
from ECC or ZF engineers or well-known community contributors. There are
ZIP editors (from ECC and ZF) who manage the process. For a ZIP to be
implemented, it usually needs consensus among ECC and ZF and general
community buy-in. If contentious, things would escalate to discussions
on forums and possibly a ZCAP vote or other poll. To date, Zcash has not
had a civil war or contentious fork -- partly because the biggest issues
(like continuing dev fund) were hashed out and a compromise reached that
most could accept. If a truly contentious scenario arose (imagine a
world where ECC wanted to remove shielded transactions to appease
regulators -- unlikely given ECC's ethos, but hypothetically), the
Foundation could veto via trademark, and the community could side with
one or the other , possibly splitting. But so far Zcash's governance has
a record of compromise and caution to avoid splits. One emerging area is
decentralized governance tooling . Some community members propose more
on-chain governance (but on-chain voting is hard with privacy -- can't
count votes easily if holders are55 157 162 163 118 21

anonymous). Others propose off-chain methods like snapshot voting with
viewing keys to prove holdings privately. The Foundation in 2023 started
using Helios (a voting tool) for ZCAP with anonymous ballots and
verifiable tallies. Long-term, there's interest in a more formal
DAO-like structure for the dev fund -- the idea of a Zcash DAO
controlling the Sustainability Fund, for instance. If implemented, ZEC
holders or ZCAP or some combination might vote on fund disbursements.
Current Debates: A big ongoing debate is of course Proof-of-Stake vs
staying Proof-of-Work . The community seems to be leaning PoS (in a 2022
survey, a significant majority of ZCAP favored exploring PoS). But
miners' voices are less heard in forums, so ECC and ZF tread carefully
-- they frame Crosslink as hybrid to keep miners involved to an extent.
Another debate is about algorithmic changes -- for example, should Zcash
change its PoW algorithm to reduce ASIC centralization in the interim
(Monero regularly changes PoW to avoid ASICs). ECC decided not to
because they see it as short-term and are focusing on PoS for long-term.
Some community members disagreed, but that debate has cooled with PoS on
horizon. The use of the dev fund also raises debate: Are ECC and ZF
delivering enough output for the money? ECC does publish transparency
reports ; some in the community scrutinize ECC's spending on things like
marketing or if they are too ZEC-price focused. When Zooko stepped down
and ECC leadership changed, some relief was expressed that ECC might be
more execution-focused and less prone to tangents (Zooko was known to
explore eccentric ideas like a new Proof-of-Space consensus, which was
debated but ultimately not pursued). Now, with Josh at the helm, ECC's
direction seems narrower: focusing on delivering the core roadmap.
Community Norms: The Zcash community's governance culture emphasizes
civility and consensus- building. The forums are moderated to ensure
respectful discourse. There is a Zcash Community Code of Conduct that
ECC, ZF, and community members adhere to. The community has a saying: "
Agree to disagree, then zk-SNARK it " (half-joking) implying focus on
facts and proofs over fights. There have been passionate arguments (like
someone proposing to eliminate the dev fund entirely was met with
pushback that it'd kill development ). But ultimately, poll after poll
has shown the community values ongoing funding and professional
development. One unique institution in Zcash governance is the concept
of the "People's Incentives" (as Zooko once wrote) -- meaning balancing
the incentives of miners, end-users, investors, and developers. This is
why the governance is multi-party (ECC, ZF, ZCG represent different
facets). It's not perfect decentralization (it's not fully community-run
like Bitcoin), but it's more structured than, say, Monero which has no
official company but a somewhat opaque group of maintainers. Regulatory
and Legal Governance: Zcash's institutions also interface with
regulators. The Zcash Foundation and ECC have jointly responded to
policy consultations (e.g., FinCEN's crypto rules, EU's MiCA). They
often position Zcash as "privacy for good" , not crime -- citing studies
like RAND's that show negligible illicit use . ZF's Josh Swihart (before
becoming ECC CEO) and others have been vocal at conferences explaining
how exchanges can comply while listing Zcash. This advocacy is part of
governance too -- making sure external forces don't govern Zcash by
banning it. So far , Zcash is legal in major jurisdictions (with
standard AML when converting to fiat), albeit with some restrictions by
individual businesses. In summary, Zcash's governance is a blend of
community consent and structured leadership . ECC and ZF are the pillars
with formal responsibilities: ECC executes technology and product, ZF
ensures openness, runs infrastructure, and amplifies community voice.
Funding has been ensured through the Dev Fund, which, though sometimes
controversial, likely saved Zcash from the fate of some unfunded
open-source projects by providing millions of dollars for development
and research. The next era of164 165 166 153 154 22

funding (the Sustainability Fund or whatever it's finally called) aims
to further institutionalize the long- term support for Zcash -- ideally
with even more community oversight to maintain legitimacy. Going
forward, watchers can expect more transparency and decentralization in
governance: for instance, decisions like moving to PoS will involve
community town halls, and possibly multiple node implementations (ECC's
and Shielded Labs') meaning no single entity writes all the code. It's a
delicate dance -- keep Zcash evolving quickly (which might favor
centralized decision-making) vs. keep it decentralized and
community-driven (which can be slower). So far , Zcash has managed to do
a bit of both: e.g., shipping NU5 (a complex upgrade) on time, but also
taking input via the ZIP process and community feedback. That bodes well
if the balance can be maintained. Regulatory & Market Context Zcash, as
a privacy-oriented cryptocurrency, exists in a challenging regulatory
landscape that has significantly shaped its market access and public
narrative. Over the past couple of years, privacy coins like ZEC have
faced increased scrutiny from regulators and exchanges, yet Zcash's
community and developers have actively engaged in dispelling
misconceptions and highlighting Zcash's legitimate uses. Exchange
Listings and Delistings: A wave of delistings of privacy coins occurred,
particularly in late 2023 and early 2024, as exchanges preemptively
reacted to regulatory pressures. For instance, in January 2024 the major
exchange OKX delisted Zcash (ZEC), Monero (XMR), and Dash globally,
citing that these coins "do not fulfill our listing criteria" amid user
feedback and presumably compliance concerns . Customers were given a
grace period to withdraw by March 2024 . This move mirrored actions by
some other platforms: in mid-2023, Binance put several privacy coins
under a "monitoring tag" and initially planned to delist them in certain
jurisdictions (like its EU platforms) before partially reversing course
. Binance's concern centered on the impossibility of tracing shielded
funds to comply with the EU's then-upcoming MiCA regulation . The
European Union's MiCA explicitly mandated that exchanges not list fully
anonymous crypto-assets unless measures are in place to deanonymize if
needed . This essentially rings alarm bells for coins like Zcash unless
technical solutions emerge. The Binance Situation: Zcash's most crucial
listing is arguably Binance (global). In late 2023, a Binance
representative approached Zcash devs with an ultimatum: find a way to
prevent deposits from shielded addresses or face delisting . Binance's
concern was that it could not verify the origins of funds coming from a
shielded pool (e.g., could be sanctioned coins) . They suggested an "
exchange-only address " -- essentially a special transparent address
type that only accepts outputs from transparent addresses, thereby
blocking z→t flows onto the exchange . The Zcash community had extensive
discussions on this in Nov 2023. Many were philosophically against
crippling shielded functionality to appease one exchange, but
pragmatically, Binance was \~15% of ZEC's trading volume (some say
higher , due to likely under-reported volumes elsewhere) . The
community, including ECC and ZF, brainstormed solutions including ZIP
320 (the unified transparent receiver UA for compliance) . By early
2024, ECC implemented support such that a user or wallet could generate
an address that is effectively "transparent only" for exchange use .
Binance seemed satisfied enough to keep ZEC listed globally into 2024,
though it likely still doesn't allow shielded withdrawals. It's a
compromise: users can trade ZEC on Binance, but when withdrawing they
must withdraw to a t-address (and then can shield it themselves).
Similarly, Coinbase and Kraken continue to list ZEC but only support
transparent addresses for deposits/withdrawals (Gemini being the
exception supporting shielded withdraw). The good news is that Zcash was
not globally delisted from top exchanges as feared -- a testament to
advocacy and technical adaptation .167 134 168 134 6 169 170 171 172 7
173 36 36 5 23

However , regionally, there were impacts: In the UK, many exchanges
stopped offering ZEC (Coinbase UK delisted in 2019 due to FCA guidance;
Kraken withdrew XMR but kept ZEC until 2021 when they geo- fenced it in
UK). In Japan and South Korea, privacy coins have been essentially
banned on exchanges since 2018. Japan's FSA and Korean FSC listed coins
like Zcash as high-risk; as a result, no regulated Japanese exchange
lists ZEC anymore, and Korean exchanges delisted them by 2021 to comply
with FATF Travel Rule requirements. So Zcash's accessibility is patchy:
very available in the US (on Gemini, Coinbase, Kraken, etc.), available
on major international platforms (Binance, Huobi, etc.), but unavailable
on many European platforms (Bitstamp EU doesn't list it; ShapeShift
delisted all privacy coins in 2018 when they were pursuing KYC). In
December 2023 , the situation escalated with OKX's blanket delisting and
commentary that others might follow . That reflected a broader tension:
exchanges weigh legal risk vs. user demand. Regulatory Attitudes:
Regulators often express concern that privacy coins could be used for
illicit finance, thwarting AML/CTF (anti-money-laundering and
counter-terrorism financing) efforts. However , actual evidence of
widespread illicit use of Zcash is scant. The RAND Corporation's
detailed study in 2020 found "no credible evidence" of large-scale
criminal use of Zcash . Chainalysis echoed that criminals still prefer
Bitcoin, and privacy coins were rarely mentioned on darknet forums (they
noted \<0.2% of darknet addresses were Zcash or Dash) . These findings
have been central to Zcash advocates' arguments: that Zcash is a tool
for legitimate privacy for law-abiding users -- from businesses wanting
financial confidentiality to citizens in repressive regimes. In fact,
ECC often highlights that regulated exchanges like Gemini and Coinbase
have managed to support Zcash within compliance regimes . This
demonstrates that compliance and privacy aren't mutually exclusive:
exchanges can use enhanced due diligence (EDD) for deposits from
shielded pools if needed, much like they do for Bitcoin coming from
mixers . Gemini's CCO has spoken about their comfort with Zcash because
of such measures and the ability to use viewing keys in rare cases if a
user needs to prove source of funds. In the US, thus far , there's no
law banning privacy coins. But there have been hints of scrutiny: for
example, a leaked U.S. Treasury "NRA" (National Risk Assessment) report
in 2022 reportedly labeled privacy coins as a potential risk. The U.S.
Secret Service in 2020 testified to Congress suggesting privacy-
enhancing cryptocurrencies could be regulated more tightly. However , no
specific action materialized at the federal level. Instead, the focus
was on mixers -- e.g., the sanctioning of Tornado Cash by OFAC in 2022
sent shockwaves. Zcash is different since it's not an external mixer but
the coin itself. There's an argument that sanctioning a protocol like
Zcash would mean sanctioning an entire blockchain network -- a far more
drastic and arguably untenable move. Thus, the approach has been
indirect: pressure exchanges (which is exactly what we saw with Binance
EU, etc.). The EU's MiCA law (Markets in Crypto-Assets Regulation)
coming into effect by end of 2024 is a landmark. It doesn't outlaw
privacy coins by name, but as quoted earlier , it says trading platforms
must be able to identify holders and transaction history of coins with
"anonymity functions" . If taken strictly, that could mean exchanges in
the EU would have to delist coins like Zcash or implement technical
solutions. ECC and others proposed solutions in a public forum -- four
proposals were debated (one being the "exchange-only" t-address type,
others involving zero-knowledge disclosures) . Binance apparently found
none of the proposals except the simple t-address one acceptable , hence
that path was taken. If MiCA is enforced stringently, we might see any
EU-licensed exchange drop privacy coins by late 2024. Some have already
proactively done so -- e.g., Kraken delisted Monero in UK/EU in late
2021 citing local regs, but interestingly Kraken still offers ZEC in EU
(likely because with ZEC they can argue they only support transparent
usage on their platform, so it's traceable -- a nuance that Monero
doesn't afford).174 175 153 154 41 176 177 178 6 169 5 179 24

Public Narrative and Media: The media often lumps Zcash with Monero and
others as "privacy coins used on dark markets." However , Zcash has not
been as prominent in cybercrime cases as Monero. Monero is often the
preferred coin on darknet markets since it's private by default. Some
ransomware groups initially demanded Monero but switched to Bitcoin
because of liquidity issues. Zcash rarely figures into these reports.
Cointelegraph, Coindesk, etc., have covered the exchange delisting saga,
often highlighting Zcash's efforts to comply in contrast with Monero's
approach (Monero's community famously said they won't compromise and if
exchanges delist them, so be it). Zcash's approach is more
middle-ground: maintain strong privacy but find ways to co-exist with
regulations (like viewing keys, compliance addresses). ECC leadership
and ZF have given interviews (Josh Swihart in 2023 did a Zcon keynote on
regulation, saying we must engage regulators to educate them). This has
helped shape a narrative that "not all privacy coins are the same" --
Zcash is positioning itself as the privacy coin that regulators can
learn to live with. For example, in 2020 when Chainalysis announced
support for Zcash tracing (only transparent parts), ECC published a blog
clarifying that this does not break Zcash's privacy and that regulated
exchanges successfully use those tools without issue . They stressed
that compliance analytics can be done on Zcash's transparent usage, and
shielded parts remain confidential -- and that's fine, as honest users
can still prove their own transactions via viewing keys if they choose .
This balanced messaging aims to alleviate regulators' fear that Zcash is
a black box for criminals. Notable Regulatory Events: - In Aug 2022, the
US OFAC sanctioned Tornado Cash (Ethereum mixer), which indirectly put a
chill on privacy tech. Some speculated privacy coins might be next, but
that hasn't happened. However , one result is many DeFi platforms
geoblocking or avoiding coins with privacy features to be safe. - In
early 2023, the UK's FCA in guidelines listed that crypto firms should
consider the risk of privacy coins and possibly treat them as
higher-risk assets, requiring enhanced checks for clients who use them.
This contributed to e.g. Crypto.com delisting XMR, ZEC, DASH for UK
customers that year . - Law enforcement successes: There have been cases
where criminals who tried to use Zcash were caught, not because Zcash
was broken, but because they made opsec errors. One case in 2020
involved Ukrainian cybercriminals who converted Bitcoin to Zcash on
Binance; when Binance shared KYC info, investigators couldn't trace the
Zcash transactions themselves, but they could associate
deposit/withdrawal amounts to identify which Zcash outputs likely
corresponded (especially if timing and amounts matched) . This sort of
case is used to argue that sophisticated criminals might use Zcash, but
it also shows the limits: authorities had to rely on off-chain data
(exchange records) rather than breaking Zcash's encryption. Market
Context: In the broader market, ZEC's price has underperformed relative
to many other cryptos. As Cointelegraph noted in Aug 2024, ZEC was down
\~98% from its all-time high and had been delisted by some exchanges,
dampening demand . Price aside, the concept of "privacy coins" fell out
of favor during the DeFi and meme coin booms -- narrative rotated to
things like NFTs, then AI tokens, etc. Privacy coins are somewhat niche
now. Monero retains a strong cult following, and Zcash is often seen as
more experimental (with its frequent upgrades and novel cryptography).
There's a perception battle: Monero is "pragmatic privacy now," Zcash is
"futuristic privacy with better crypto but fewer users now." ECC has
tried to change this by improving UX (so that not only cryptographers
care about Zcash, but average folks can use it easily). Media Critiques
and Responses: Common critiques include: "Zcash is a ghost chain, nobody
uses shielded transactions." (This was often said around 2019 when only
2% tx were shielded). The response now: shielded adoption has grown and
Zcash's privacy is proven superior when used . Also "Privacy coins will
be regulated out of existence." Response: Zcash has proactive compliance
features and research collaborations (and indeed, it has survived
multiple regulatory waves where others perished from exchanges). Another
critique: "Could Zcash's encryption be backdoored since the government
hasn't180 176 2660 181 182 30183 25

banned it?" -- a conspiracy theory occasionally floated. There's zero
evidence of that; it's more that Zcash's opt-in nature makes it less of
a target and ECC/ZF engage with policymakers. In mainstream media, Zcash
doesn't get as much coverage as Bitcoin or Monero. But it's sometimes
mentioned positively in contexts like human rights: For example, the
Human Rights Foundation's Alex Gladstein has mentioned Zcash as a
promising tool for financial privacy if they can solve adoption and
trust perceptions. Zcash Media created videos with glowing perspectives
on why privacy matters for everyone, not just criminals -- these serve
as good PR. Legal Status: Zcash has not been declared illegal in any
major country as far as known. However , Japan's self-regulatory body
for crypto (JVCEA) maintains a blacklist that effectively bars privacy
coins (so no exchange listing). Australia's exchanges voluntarily
delisted them in 2020 after regulator guidance. On the other hand,
places like Switzerland have been relatively friendly: Zcash is listed
on the SIX Swiss exchange as an ETP (exchange-traded product), giving
institutional investors exposure. That suggests some regulators see it
similarly to Bitcoin -- as long as KYC is around it, it's acceptable.
Overall Narrative: The narrative in 2025 is that privacy coins are under
pressure, but Zcash is adapting to remain compliant-friendly. The
community often emphasizes that cash-like privacy is important : they
draw parallels that just as physical cash transactions aren't fully
traceable but still widely accepted, digital cash (Zcash) deserves
similar treatment . Regulators are being slowly educated that not every
use of encryption is nefarious. ECC and ZF also highlight Zcash's
publicly beneficial uses : e.g., donations to NGOs who need financial
privacy, or everyday people protecting their financial history from data
breaches and Big Tech. One more angle: Competition from other privacy
solutions . With increased scrutiny on L1 privacy coins, some have
turned to L2 or application-layer solutions (like Tornado on Ethereum,
Lightning on Bitcoin for some privacy, or new projects like Aztec
Network). Zcash's response is to become a platform for privacy (hence
ZSAs and cross-chain integration). This way, even if people don't buy
ZEC for speculation, they might use Zcash tech via a wrapped token to
privately move assets. In summary, Zcash operates in a tightrope
regulatory environment. It has so far navigated it without losing major
footing -- still listed on crucial exchanges, not outlawed, and with a
somewhat positive reputation among those regulators who have engaged.
But headwinds remain: upcoming enforcement of travel rules and MiCA in
various jurisdictions could pose further hurdles. The project's strategy
of engagement and technical compliance options aims to ensure Zcash can
continue to be available to users who need it, rather than being
relegated to the fringes. Market-wise, regulatory fears have likely hurt
ZEC's price (some institutional investors may avoid it due to perceived
risk), but with clearer laws coming (MiCA provides clarity even if
strict), Zcash could find a firmer footing if it demonstrates that it
can comply while preserving privacy for users. Risks & Open Questions
Like any ambitious cryptocurrency project, Zcash faces a number of risks
and open questions across technical, economic, regulatory, and community
dimensions. Here we outline the most salient ones, along with
considerations of how they might be mitigated or what the uncertainty
entails. Technical Risks: - Security Vulnerabilities: Zcash relies on
advanced cryptography. A catastrophic risk is the discovery of a flaw in
its zk-SNARK circuits or cryptographic primitives. For example, a bug
that allows counterfeiting of ZEC (as actually happened once in 2018,
covertly fixed by Sapling) would be disastrous if exploited . ECC's
rigorous circuit audits and use of peer-reviewed constructions (Halo
2)26176 41 26

mitigate this, but zero-knowledge tech is complex. Another security risk
is a breaking of zk-SNARK assumptions (like if quantum computing or a
math breakthrough compromised the elliptic curves or hash functions
used). This risk is not unique to Zcash, but Zcash would be heavily
impacted since privacy and supply integrity both depend on those
assumptions. The team is aware -- there's some research into
quantum-resistant proofs, but nothing immediate. For now, monitoring
advances in cryptography is crucial; in worst-case, Zcash could pivot to
new primitives via a hard fork (as they did moving from Sprout to
Sapling circuits when improvements were found). - Trusted Setup
Remnants: Although Orchard removed the need for new trusted setups, the
original Sprout and Sapling setups remain a historical footnote. If,
hypothetically, the Sprout toxic waste were compromised, someone could
forge Sprout shielded value. However , since Sprout is now obsolete and
the turnstile prevented infinite exploits without detection, this is
largely a past risk. Sapling's MPC was robust with many participants,
but trust remains that no \>2/3 subversion occurred. There's an open
question of whether Zcash can/should ever fully turn off Sapling to
eliminate even that theoretical risk. Likely not, as Sapling will phase
out organically. - Protocol Upgrades and Complexity: Zcash's frequent
upgrades and additions (Unified Addresses, ZSAs, etc.) increase
complexity and the chance of unintended bugs. For instance, adding ZSAs
touches consensus-critical code; a bug there could be exploited. The
upgrade process itself is a risk: if miners or exchanges fail to update
in time, it could cause network instability or splits. Zcash has so far
executed upgrades smoothly (with strong communication and adoption \>95%
by miners each time ), but as the ecosystem grows (more third-party
software to coordinate), it gets harder . A related risk: deprecating
zcashd and moving entirely to Zebra by NU7 is aggressive. If Zebra or
the new wallet RPC wrapper aren't as battle-tested, the network could
hit hiccups after NU7. ECC and ZF are mitigating by heavy testing and
parallel running of both implementations pre-cutover . But it's still an
open question: will the new stack be as stable and performant as
zcashd? - Proof-of-Stake Transition Risks: Should Zcash implement hybrid
or full PoS, it introduces new risks. PoS is itself complex and can have
issues (e.g., nothing-at-stake, stake centralization, or governance
capture through stake weight). Hybrid Crosslink aims to get the best of
both PoW and PoS, but the design is novel -- unknown unknowns may exist.
One risk is community division : if some users strongly oppose PoS, a
contentious fork could occur (like Ethereum vs Ethereum Classic
scenario). However , since much of the community including core figures
favor PoS, that risk seems moderate. Technically, if PoS isn't designed
carefully, it could reduce chain security -- but the whole idea of
Crosslink is to increase security by adding finality. It remains an open
question how seamlessly Zcash can integrate PoS given its need for
private staking (stake addresses might be shielded, raising how to do
slashing evidence, etc.). These are open research questions that
Shielded Labs and others are tackling now, with the potential for
unforeseen complications. - Scalability and Performance: Zcash's
performance on-chain is fine now, but if usage spiked (say ZSAs bring in
high volume of token transactions or DEX trades), can it handle it?
Shielded transactions are larger (several kB) and slower to verify than
Bitcoin transactions. If Zcash started doing thousands of TPS, block
sizes and sync times could balloon, possibly harming decentralization.
The current rate is low, so it's not urgent, but with cross-chain and
ZSA adoption, volumes could increase. Zcash might need scaling solutions
down the road (like batching or sharding techniques). They've hinted
Halo could allow L2s (by recursive proving entire blocks). It's a
potential path, but no concrete plan -- so scalability is an open
question beyond the current capacity. - Anonymity Set Erosion: A
technical risk to privacy is if user behavior patterns or external data
erode the effective anonymity. Chain analysis might improve. For
example, if many users use the same lightwalletd, traffic analysis could
match sends and receives by timing (Tor integration helps mitigate that
as of 2025 ). Or if shielded usage stagnated, then anonymity set stops
growing, which could incentivize adversaries to attempt linking by
observing amounts (even though amounts are hidden, repeated patterns
might leak info). The ongoing challenge is to keep shielded usage
widespread enough that any given user's actions are lost in the crowd.
This ties into adoption but also into possibly introducing decoy outputs
or volume padding if needed. Monero uses ring decoys, Zcash currently
doesn't; an open question is whether Zcash should ever add dummy traffic
or other techniques to bolster privacy if usage was insufficient. Right
now, trending usage up alleviates this.184 80 74 27

Economic and Incentive Risks: - Funding Sustainability: While the Dev
Fund provides for now, it's reliant on ZEC price. If ZEC were to drop
severely or stay low long-term, ECC and ZF budgets might shrink, leading
to brain drain or project slowdown. ECC in 2022 downsized by \~20% staff
in a bear market. They have runway, but prolonged low price is a risk to
continued development. The plan for a Sustainability Fund (ZSF/NSM) is
in part to gather a reserve so that funding isn't only block-by-block.
But executing that plan is still pending. Also, if ZCG's pool isn't
replenished or well-managed, ecosystem growth could stall. ZCG had a lot
of ZEC in treasury from 2021 highs, but have to manage those funds
carefully. There's also risk in allocation: if ECC needed more funds or
Shielded Labs needs funding, how to balance? The community could vote to
adjust block splits. But that could upset parties (e.g., miners if asked
to give up more than 20% rewards). - Mining Centralization and 51%
Attacks: As mentioned, mining is relatively centralized among a few
pools. A 51% attack is a low-probability but high-impact risk. If a pool
or colluding miners double-spent or censored transactions, it would hurt
confidence massively. The ViaBTC event showed it's not just theoretical
. Until PoS reduces this risk, the community must rely on social
coordination: encouraging miners to distribute, or even possibly a user-
activated soft fork to change PoW if a malicious majority took over . So
far that hasn't been needed. Another related risk is if regulation
target miners -- e.g., if OFAC said "mining privacy coins might be
facilitating money laundering." Unlikely, but some US miners might then
avoid Zcash, shrinking the hash network to possibly only miners in
less-regulated areas (which could ironically concentrate it more). - Dev
Fund Legitimacy: The dev fund is essentially a "tax" on miners. If
miners or some subset of the community strongly objected (in 2020 a few
were unhappy but had no leverage as they were minority), they could
attempt to fork Zcash to remove it. For example, a hypothetical "Zcash
Classic" with no dev fund. That hasn't happened in any serious way --
possibly because ZEC's value is tied to ongoing support, so miners
grudgingly accept the tradeoff. But if ECC/ZF were seen as not
delivering or misusing funds, it could spark community backlash. The
transparent reporting and the involvement of community (ZCG) in a big
chunk of the fund helps mitigate that. But it's an area to keep trust --
hence ECC and ZF strive for transparency . - User Base and Demand:
Economically, the biggest question: will demand for ZEC (or Zcash usage
broadly) grow enough to support the project's goals? ZEC's price and
market cap risk falling into irrelevance if adoption doesn't pick up.
That could cause a vicious cycle (developers leave due to low funding,
etc.). Zcash is in a fight for relevancy in a crypto world obsessed with
other trends (DeFi, etc.). If ZSAs and other features fail to attract
significantly more users, Zcash could remain niche. There's also the
risk that a superior privacy solution emerges elsewhere (say Ethereum
implements a robust L2 with privacy that gets traction, or a new chain
like Aleo or Namada offers similar privacy with more features). Zcash's
competitive section (below) touches on this. But if Zcash lost its
mantle as "most advanced privacy coin" due to stagnation or being
leapfrogged, demand could wane. - Monetary Policy Perception: Zcash's
inflation rate historically was a critique (as high as \~20% in early
years). Now after two halvings it's more modest (\~6% dropping to \~3%).
Some potential investors may have avoided ZEC due to inflation. With
halving, that is resolving. By 2028, ZEC inflation will be below 2%,
comparable to Bitcoin. However , Zcash does not have a "hard cap" in the
exact sense, it has asymptotic supply \~21M. That's fine. But a risk
would be if any inflation bug occurred (which ECC would try to handle by
possibly a chain rollback if detected, as they stealth-fixed the 2018
one). Another subtle economic question: if PoS is implemented, how will
issuance be split or changed? Some community talk has been of maybe
reducing total issuance to pay stakers from transaction fees instead,
etc. Altering monetary policy is sensitive and could spook holders if
not handled transparently and conservatively. Regulatory Risks: - Legal
Ban or Heavily Restrictive Regulation: The worst-case would be a major
economy outlawing privacy coins entirely (possession, use, etc.). Thus
far , only a few countries (like possibly Morocco which had strict
crypto laws in general) might indirectly cover that. If, say, the US or
EU outright banned them, Zcash's value and usage would crater . Given
current trends, an outright ban is unlikely; instead, the approach is to
gate them at exchanges. Even if exchanges delist ZEC globally (like if
Binance, Coinbase, etc. all gave up), Zcash can survive via DEXes, but
liquidity and price would185 186 28

suffer dramatically. Regulatory risk is thus moderate: Zcash is still
under watch and could face more exchange delistings as travel rule
enforcement tightens by 2025. The team's approach of working on
compliance-friendly features is to preempt the ban scenario. But it's
open: will regulators be satisfied by exchange-only addresses and
viewing keys, or will they still treat ZEC with suspicion? The next year
or two of MiCA rollout and how exchanges respond will clarify this. -
Enforcement and Chilling Effects: Another risk is that even without a
ban, compliance burdens become so high that businesses voluntarily avoid
Zcash. For example, if FinCEN in the US required exchanges to collect
sender info for any privacy coin deposit (there's been talk of requiring
more info for transactions from non-custodial wallets -- the so-called
"Travel Rule" implementation). If that happened, using Zcash with
shielded could become impractical for interacting with centralized
services because you'd need to reveal details anyway. That could deter
new users. On the flip side, it could encourage people to stay fully
on-chain with Zcash, but the reality is most liquidity flows through
exchanges. - Negative Publicity/Association: Zcash must avoid being too
closely linked to criminal cases. If a high-profile crime ring is found
using Zcash, you can bet regulators will mention that in hearings.
Monero had that with some ransomware. Zcash has been lucky to not
feature heavily. But as it gains features, it might get targeted. For
instance, if shielded assets are used for money laundering, Zcash could
catch heat as "enabling illicit tokens." To mitigate, ECC and ZF may
need to continue outreach to law enforcement (they've engaged with
global regulators to explain how Zcash works and how illegal use can be
countered without breaking the protocol). User Experience and Adoption
Risks: - Complexity for Users: Privacy is delicate -- if users make
mistakes, they can accidentally expose data (like sending from a
shielded address then reusing a transparent address, linking
identities). Zcash tries to handle this (auto-shielding, not reusing
addresses). But as features pile on (UA, multiple assets, viewing keys),
the UX could become confusing. If users find it too complicated, they
might not bother . That's why ECC emphasizes human-centric design
(Zashi's guided approach). Still, an open question is: can shielded
usage ever be as brainless as using Venmo or a bank app? Without that,
mainstream adoption might be elusive. The risk is Zcash remains a tool
only for the tech-savvy or privacy die-hards. - Mobile and Light Client
Reliability: For adoption, mobile wallets must be reliable. Zcash's
protocol can be resource-heavy (downloading trial decryptions for each
note in wallet sync). If these apps lag or break often, users drop off.
ECC improving sync (lighter trial decryptions, etc.) is ongoing, but any
friction is a risk to growth. - Community Centralization: Another risk
is concentration of influence. Despite decentralization efforts, ECC and
ZF hold a lot of sway. If either organization had internal issues (e.g.,
mismanagement, or a pivot to unrelated projects, etc.), it could hurt
Zcash. ECC's restructure (donation to Bootstrap) was to ensure mission
alignment. But say ECC leadership changed direction drastically (not
likely given current management ethos), the community might be at odds.
The checks and balances (ZF, ZCG, ZCAP votes) mitigate this somewhat.
Contingencies and Unknowns: - What Could Invalidate Key Roadmap
Assumptions? If, for example, Halo's security assumption was invalidated
(extremely unlikely short of quantum computers), then the whole plan of
trustless ZEC fails -- contingency might be to revert to an older scheme
or adopt a new proof system quickly. If PoS Crosslink turned out to be
too complex or not much better , would they scrap it? Possibly; they
might then try other routes like improved PoW or sharding. If the
community rebelled against ECC's direction (say a significant portion
wanted no dev fund or no PoS), governance would be tested -- likely with
ZF mediating and maybe a community vote to pick a path or even splitting
amicably if irreconcilable. - Competition wildcard: If another coin
achieved what Zcash offers with less friction (imagine a hypothetical
"Monero 2.0" that gets Zcash-level anonymity but still default and with
no trusted setup ever needed and high speed), Zcash might be
outcompeted. To an extent, Zcash hedges by staying at the frontier of
cryptography (they plan to incorporate the best tech, e.g., if new
primitives arise, they can upgrade since they've done it before). But
competition could also come from outside crypto -- e.g., if CBDCs or
banks offer private digital cash for retail (somewhat far-fetched, but
if it happened, the narrative for needing Zcash might weaken). - Social
and Ethical Issues: Privacy tech 29

can be misused. An open question is how Zcash handles pressures if, say,
a terror financing incident were alleged with ZEC. The ethical stance of
Zcash is privacy is a right; but external pressure might mount. Would
Zcash ever consider optional features like an "encrypted memo with
sender identity if user opts in for compliance" etc.? There's always a
risk of slippery slope: incorporate too many compliance features and you
upset core users; incorporate too few and you face bans. Navigating that
is an ongoing challenge and open question. So far , they've done minimal
additions (just viewing keys which were always part of design). In
conclusion, Zcash's future depends on managing these risks by leveraging
its strengths: a talented, well-funded dev team (so technical risks can
be proactively addressed), a supportive community (to handle governance
debates), and unique tech (to stay ahead of competition). Many open
questions -- like "Will ZSAs catch on?" or "Can Zcash move to PoS
without issues?" -- will only be answered with time. Zcash's approach is
to remain adaptable: as their roadmap slogan says, "improvise as new
information emerges" . This flexibility is itself a risk (lack of fixed
direction can be unsettling) but also a necessity in the fast-evolving
crypto space. The next 1--2 years will likely clarify a lot: if Zcash
surmounts these hurdles, it could cement itself as the go-to privacy
platform; if not, it might fade to a smaller niche. The project is very
much aware of this high-stakes balance, which is why there is intense
effort on all fronts -- tech, regulatory, user growth -- to ensure Zcash
thrives. Competitive Landscape Zcash operates in a broader ecosystem of
privacy-preserving cryptocurrencies and technologies. To understand its
positioning, it's worth comparing it to direct peers like Monero (XMR)
and others (Dash, Firo, etc.), as well as emerging privacy solutions on
other platforms. Here's how Zcash stacks up and what the competitive
outlook might be: Monero vs Zcash: Monero is often considered Zcash's
chief rival as a privacy coin. Both aim for similar outcomes --
untraceable, unlinkable transactions -- but via very different means.
Monero's approach is to make privacy mandatory: it uses ring signatures
(currently ring size 16, to be expanded with future upgrades), stealth
addresses, and confidential transactions (RingCT) to ensure every
transaction conceals sender , receiver , and amount. This means on
Monero's ledger , all transactions are obfuscated by default. In
contrast, Zcash's approach is optional but stronger per transaction:
when a Zcash tx is fully shielded, the anonymity set is much larger and
the privacy is stronger than a Monero tx, according to many experts .
However , not all Zcash transactions are shielded, whereas all Monero
transactions (since 2017) are private. Usage and adoption: Monero has
arguably achieved greater adoption in its domain: it is the de facto
currency on certain darknet markets and among some privacy advocates.
It's often mentioned as a currency for evading tracking -- which is both
a pro (for privacy) and con (for perception). Exchanges have also
delisted Monero more aggressively than Zcash. For instance, in 2021,
Kraken delisted Monero in the UK due to regulatory pressure, but they
did not delist Zcash at that time . This shows Zcash has a slight
advantage in compliance perception; Monero's "no compromises" stance
means it can be seen as more at odds with regulators. This translates to
availability: by 2025, fewer major exchanges list Monero (Binance does,
but some have dropped it), whereas Zcash still sees listings on many
tier-1 exchanges . From a technology roadmap perspective , Monero has
been more incremental: it's working on Seraphis and Jamtis , a future
upgrade to improve its addresses and decouple amounts from identity
further . Monero's planned upgrades (possibly in 2024/25) will increase
ring size dramatically and change address formats, aiming to strengthen
privacy and scalability. Zcash's roadmap is arguably more99 2634 187 182
30

ambitious, pushing new frontiers (like ZSAs, Halo proving system with
recursion, PoS). If these succeed, Zcash could outpace Monero in
features -- e.g., Monero cannot support tokens or interoperability
easily, whereas Zcash is aiming for both. On the other hand, Monero's
simplicity (no trusted setup ever required, no reliance on novel math
like pairing cryptography) appeals to some users as more battle- tested
and decentralized in development (no central company). Performance:
Monero transactions are larger (2-3 kB each) and verification is slower
than Bitcoin's, but still manageable (\~20 tx/sec max). Zcash's shielded
transactions (Sapling/Orchard) are a few kilobytes too, and verification
is quite fast due to efficient SNARKs; however , creating a proof on a
mobile for Zcash historically took a few seconds (Sapling), now Halo 2
reduces that overhead. Monero has the advantage that its privacy doesn't
rely on heavy computation per transaction by users -- it's all baked in.
Zcash requires generating zkProofs which historically was a bit heavy
but now increasingly efficient. Zcash's memory and CPU needs on mobile
have come down (Zashi's progress shows mobiles handle it decently).
Monero is more lightweight in that sense (any half-decent device can
make Monero transactions quickly), which is an edge for low-power users
or IoT. But Zcash's new proving might catch up in ease, plus Zcash
supports light clients better (Monero's privacy requires downloading
lots of decoys or scanning entire chain, whereas Zcash can use
lightwalletd to fetch notes needed). Community and Governance: Monero is
community-driven (no formal foundation controlling it; a Core team leads
development funded by donations). Zcash has formal institutions (ECC,
ZF) and funding. This leads to differences: Monero can be slower to
adopt radical tech (as there's more consensus-building needed among
open-source contributors). Zcash can marshal resources to implement big
changes (like Halo) relatively quickly. But the flip side is
decentralization: Monero community might trust their process as more
grassroots, whereas Zcash's approach could be seen as more corporate
(for better or worse). For example, Zooko's advocacy for PoS in Zcash
was top-down (though with community discussion), whereas Monero's
community generally has resisted PoS (Monero will likely remain PoW
indefinitely, focusing on ASIC-resistance to decentralize mining). Other
Privacy Coins: - Dash: Once marketed as "digital cash" with a
PrivateSend feature, Dash's privacy is based on CoinJoin mixing and is
relatively weak compared to Zcash/Monero. Many do not consider Dash a
true privacy coin (and Dash itself pivoted away from that narrative to
avoid delistings). It's been delisted from some exchanges (like Upbit in
Korea). Dash's roadmap is more focused on payments and usability (they
implemented an ENS-like username system, etc.) and not on improving
privacy. So Zcash isn't directly competing with Dash on privacy tech --
Zcash far exceeds Dash's privacy capability. Dash's advantage is maybe
brand recognition and merchant integrations, but Zcash is catching up
via things like Flexa . Over time, Dash's relevance in privacy has
waned. - Firo (formerly Zcoin): Firo is a smaller project that
implemented the Lelantus and then Lelantus Spark protocols (inspired by
Zerocoin and RingCT). It offers privacy via burn-and-redeem: you burn
coins and later redeem new ones not linked to the old ones. Its
anonymity set is limited by usage and parameters. Firo has struggled
with exchange delistings as well (Binance threatened it as mentioned in
the forum context ). Firo's upcoming Spark is similar to Zcash's Sapling
in some ways (it will have stealth addresses, etc.). However , Firo is
much smaller in user base and market cap. It's more of a niche
alternative -- not a serious threat to Zcash's mindshare, but it does
compete in the privacy coin space for those who want something outside
the "big two". Zcash's heavy-weight backing and continuous upgrades
likely give it an edge over Firo in the long run, unless Zcash falters
and Firo capitalizes (currently Firo's tech lags a bit, as Spark isn't
live yet whereas Orchard is). - Secret Network (SCRT): This is a smart
contract platform (built on Cosmos SDK) that uses Trusted Execution
Environments (Intel SGX enclaves) to enable private smart contracts. It
can have privacy for tokens and contracts by running code in secure
enclaves. Secret had some traction in DeFi (secret swaps, etc.), but it
introduces trust in hardware and has suffered from performance and some
exploits (one major SGX vulnerability could compromise it). Secret
positions itself as a private DeFi platform vs. Zcash as a private money
platform. With Zcash adding assets and109 188 31

bridging to DeFi via Thorchain, the two could overlap. A difference:
Zcash is non-Turing complete (no smart contracts on L1), whereas Secret
can do arbitrary contracts but at cost of complexity and weaker trust
assumptions. For a user just wanting to hold and send privately, Zcash
is simpler and arguably more secure (pure math vs hardware trust). For a
developer wanting to build a privacy-preserving app, Secret might be
attractive, though now Ethereum L2s with zkRollups might overshadow
Secret. - Emerging Projects (e.g., Aleo, Namada, Aztec): There are new
L1s like Aleo (uses ZKPs for private applications, currently testnet,
raised big funding), Namada (from Anoma team, focused on multi-asset
shielded transfers and even an IBC with Zcash itself -- Namada announced
an airdrop to ZEC holders, interestingly -- they see Zcash as
complementary and even offered to help with ZSA bridging), and Aztec
(which was an Ethereum L2 using zk-ZKPs, though Aztec team pivoted in
2023 after Tornado sanctions). These projects use cutting-edge ZK proofs
similar to Zcash. Aleo aims to be a full private dApp platform. If Aleo
succeeds, it could attract developers and use cases beyond simple
transfers, potentially outcompeting Zcash on functionality. However ,
Aleo is still early and may target different use cases (private gaming,
etc.). Namada is perhaps more directly competing: it aims to provide a
unified shielded set for multiple assets (sound familiar? It's similar
to ZSA vision) and to allow interchange with other chains. Namada's
founder (Awa Sun Yin) is friendly with Zcash -- they even discussed
giving ZEC holders an airdrop and collaborating on technology. It's
possible in future Namada's shielded set might connect to Zcash's (e.g.,
via IBC or a bridge), forming an inter-chain privacy alliance. So Namada
is competitor in that it might offer what Zcash does plus proof-of-stake
from scratch, but also collaborator in ethos. If Zcash's Crosslink PoS
is delayed and Namada thrives, some Zcash users might drift there for
staking and multi-asset capabilities. But Zcash has first-mover
advantage in actual usage and brand. - Bitcoin & Ethereum privacy
layers: Zcash indirectly competes with how well Bitcoin and Ethereum can
become private. Bitcoin's community has resisted any built-in privacy
beyond basic coinjoin. Instead, we have things like Wasabi Wallet or
Samourai Whirlpool coinjoins on Bitcoin -- not as robust as Zcash, and
chain analysis can often cluster coinjoins. There's also ongoing work on
Bitcoin's Taproot which marginally improved privacy by making
transactions look more uniform, and ideas like CashFusion (on Bitcoin
Cash) or ARK (a proposal for Bitcoin anonymity via decoy routing) -- but
none close to Zcash's level. Ethereum had Tornado Cash for transactional
privacy (now largely defunct due to sanctions) and is exploring Privacy
Pools (a successor concept incorporating opt-in compliance where users
can prove their withdrawals were not from illicit sources). If Ethereum
achieves a compliance-friendly mixer , some might prefer using ETH's
liquidity for private transfers over moving to Zcash. However , the UX
of doing privacy on Ethereum is still clunky and costs high gas fees.
Zcash can do it natively with low fees. Also, Ethereum doesn't hide
addresses or assets by default (just amounts in Tornado). Zcash's
holistic privacy (hiding sender , receiver , amount) remains stronger
. - Lightning Network and other L2s: On Bitcoin, Lightning offers some
privacy (off-chain routing obscures transaction details somewhat), but
it's not designed primarily for privacy and has its own traceability
issues (channel opens/closes are on-chain). Still, if used cleverly,
Lightning can provide some plausible deniability for small payments. For
bigger value, Zcash's on-chain shielded is arguably more private. On
Ethereum, rollups that implement zk proofs (like Aztec had, or StarkNet
potentially) could allow e.g. shielding ERC-20 transactions in a layer-2
environment. If those become popular , some might achieve privacy
without needing a separate coin. But they are not trivial to use and
often have trade-offs. Feature Comparisons: Privacy Strength: Zcash
(shielded) and Monero both robust, though different threat models.
Monero's main weakness is lower anonymity set per tx (some research
papers showed statistically you can reduce the effective anonymity of
ring signatures especially when ring size was 5-11; at 16 it's better
but still not huge). Zcash's main weakness is low usage historically and
the fact many transactions are not shielded -- but for the ones that
are, it's very strong . If we consider an ideal scenario: Monero, every
tx hidden but possible weaknesses in rings; Zcash, not all tx hidden but
those that are have no known breaks. • 34 32

Performance & Scalability: Zcash's zk-SNARKs allow it to scale
relatively well -- verification of proofs is quick. Monero's ringCT
burdens every full node to verify large signatures; as Monero's usage
grows, it can be heavier to maintain. Zcash full nodes don't verify
every shielded detail unless needed (they verify proofs though which is
constant-time quick). Zcash's potential use of Halo for L2 could allow
leaps in scalability if realized. Smart Contracts & Extensibility: Zcash
L1 is not programmable beyond basic scripts (like Bitcoin's limited
script). Monero similarly isn't programmable. In contrast, coins like
Secret or upcoming Aleo allow smart contracts. If one believes private
smart contracts are the future (private DeFi, etc.), Zcash might seem
limited. However , ECC's focus is specifically on money (they say
digital cash). The introduction of ZSAs might give Zcash some DeFi
adjacent capability (like issuing stablecoins which can then be used in
DeFi via Thorchain swaps etc., rather than building an AMM directly on
Zcash L1). Possibly down the line, Zcash might integrate with an L2 that
supports private contracts (maybe a partnership with Aleo or something).
For now, if a user needs complex private dApps, Zcash can't provide that
-- they'd look to something like Secret or Aztec if revived. Community &
Ideology: Monero's community emphasizes trustlessness and not
compromising with regulators (no optional transparency, no viewing keys
by default -- though they now consider "view tags" to help exchanges
scan for their deposits faster , which is a minor metadata addition).
Zcash's community (at least leadership) is more pragmatic on working
with the system (viewing keys, compliance addresses). This ideological
difference can attract different users: some cypherpunks distrust Zcash
for having had a trusted setup and a company, preferring Monero's more
grassroot vibe. Others find Monero's refusal to engage with compliance
as a dead end, and thus prefer Zcash's approach that might see wider
adoption. How these philosophies play out will determine who captures
more user base in the long run. If regulators clamp down, Monero could
become very hard to acquire or use in mainstream, pushing it
underground, whereas Zcash might still be accessible on big exchanges --
thus easier for average people to get. Timeline and Citations
Comparison: To highlight some dated milestones: - Monero launched 2014;
enforced privacy by default in 2017 with RingCT. - Zcash launched 2016;
privacy not default but stronger tech. - Monero's biggest recent
upgrade: Aug 2022, increasing ring size to 16, introducing Bulletproofs+
for faster proving, and "Triptych" or similar research ongoing (maybe
2024/25). - Zcash's biggest recent upgrade: May 2022 NU5 with Halo, and
upcoming NU7 with ZSAs in 2025 . Both communities are active: Monero
does one upgrade per year or so (last was 2022, next perhaps 2024/25 for
Seraphis). Zcash is doing one every \~1.5 years now. Conclusion on
Competitive Outlook: Zcash and Monero are likely to coexist, each
serving slightly different demographics or use cases. It's akin to two
high-end security tools where user preference and context decide which
to use. If Zcash successfully implements PoS, it will differentiate from
Monero's PoW -- potentially attracting those who want staking yields and
an energy-efficient network, but possibly alienating PoW purists (some
of whom might migrate to Monero if they dislike PoS on Zcash). If ZSAs
succeed, Zcash will have a functionality edge -- something Monero devs
explicitly chose not to pursue (they don't want assets on Monero to
avoid complexity and potential dilution of anonymity). That could bring
in users who need multi-asset privacy (like institutions wanting to move
tokenized assets privately might look to Zcash). In the wider ecosystem,
Zcash also might not need to "beat" others in isolation; it's
increasingly connected (through Thorchain, bridges, etc.), which
suggests a privacy network rather than a single chain wins. For
instance, an ideal scenario: Zcash provides a robust shielded pool that
other chains can plug into (via Namada's vision or bridges), making ZEC
kind of a privacy reserve currency or intermediary. In that scenario,
Monero's isolation (not easily bridgeable due to no smart contracts or•
• • 88 33

easy interoperability) might limit it, whereas Zcash integrated into
cross-chain flows could amplify its utility beyond being just a coin.
One should also mention Ethereum's future : Vitalik Buterin has
expressed support for Zcash and even funded some Zcash-related things ,
and Ethereum devs talk about adding privacy (there's EIP-3475 for
stealth addresses on ETH, etc.). But Ethereum's base layer is unlikely
to ever be fully private due to its broad usage and regulatory pressure.
Instead, L2 solutions will carry that torch there. Zcash can thus fill a
role as a privacy specialist chain cooperating with Ethereum (via
wrapped ZEC on ETH or vice versa). Ultimately, Zcash's competition is
not just with other privacy coins but with the broader notion of
financial privacy adoption. If privacy as a category grows, multiple
winners can exist (like multiple secure messaging apps exist). If it
shrinks (due to regulations or apathy), even the "winner" among privacy
coins might have a small user base. Zcash's strategy is to expand the
category by being privacy + something (private DeFi, private assets,
etc.) which could set it apart from Monero's pure currency approach.
Both have their merits, and users may use both for different things
(some do: for instance, use Monero for quick small purchases, Zcash for
larger transfers or interacting with certain platforms). The competitive
landscape remains dynamic; the next couple of years will reveal whether
Zcash's gambles (Halo, PoS, ZSAs) pay off and allow it to outpace
Monero, or whether Monero's simpler , consistent approach holds its
ground as the leading privacy coin. References: Electric Coin Co. -- ECC
Roadmap: Q1 2025 (Feb 1, 2025) Zcash Community Forum -- "They Grow Up So
Fast: Zashi 2.0" by peacemonger (Apr 28, 2025) Zcash Community Forum --
Zashi Release Updates by decentralistdan (Oct 21, 2024 & Feb 11, 2025
posts) Zcash Community Forum -- 2025/6 Zcash Protocol Roadmap by joshs
(Jul 25, 2025) Electric Coin Co. -- "Onward in 2025: ECC Update from
Zcash Summit" by Josh Swihart (Jan 19, 2025) Electric Coin Co. Blog --
"Zcash + Maya: Privacy, Self-Sovereignty, and Decentralization" (May 21,
2025) Blockworks -- "Privacy coins Zcash and Monero face delisting by
exchanges" (Dec 29, 2023) Zcash Community Forum -- "Important: Potential
Binance Delisting" by aquietinvestor (Nov 6, 2023) Cointelegraph --
"Zcash founder joins Shielded Labs, pushes for hybrid PoS upgrade" (Aug
12, 2024) Electric Coin Co. -- "Zashi 2.1: Enhanced Privacy with Tor
(Beta)" (Aug 7, 2025) Brave.com -- "Brave Wallet adds shielded Zcash
transactions..." (Apr 2, 2025) Business Wire -- "Flexa and ECC Announce
Integration to Enable Instant Payments with Zashi" (Nov 26, 2024) Zcash
Community Forum -- ECC Roadmap for Q2 2024 by joshs (Apr 18, 2024) Zcash
Community Forum -- Ensuring Sustainability of Zcash Dev Fund (Jason
McGee post) (Mar 2024) Electric Coin Co. -- "Zcash is Winning" by Zooko
Wilcox (Aug 9, 2024) Electric Coin Co. -- "Zcash privacy remains
strongest..." (June 30, 2020) Blockworks -- see reference 7 (OKX delist
and Binance reversal) Cointelegraph -- see reference 9 (ZEC
price/all-time high and delist context)97 1. 111 189 2. 19 20 3. 62123
4. 80190 5. 1289 6. 10116 7. 167 191 8. 170 7 9. 9097 10. 2173 11. 112
76 12. 109 110 13. 13100 14. 157 192 15. 104 193 16. 3427 17. 134 5 18.
182 92 34

RAND Corporation -- Quoted in Electric Coin Co. blog (June 30, 2020)
Chainalysis -- Quoted in Electric Coin Co. blog (June 30, 2020) Zcash
founder joins Shielded Labs, pushes for hybrid PoS upgrade
https://cointelegraph.com/news/zcash-founder-joins-shielded-labs-pushes-for-faster-hybrid-pos-upgrade
Zcash is Winning. Zcash is the most important project in... \| by zooko
\| Medium https://medium.com/@zooko/zcash-is-winning-48579b89770e
Privacy coins Zcash and Monero face delisting by crypto exchanges -
Blockworks
https://blockworks.co/news/crypto-exchanges-delisting-privacy-coins
Important: Potential Binance Delisting - General - Zcash Community Forum
https://forum.zcashcommunity.com/t/important-potential-binance-delisting/45954
Zcash + Maya: Privacy, Self-Sovereignty, and Decentralization - Electric
Coin Company
https://electriccoin.co/blog/zcash-maya-privacy-self-sovereignty-and-decentralization/
ECC Roadmap for Q2 2024 - General - Zcash Community Forum
https://forum.zcashcommunity.com/t/ecc-roadmap-for-q2-2024/47465 Onward
in 2025. ECC Update from Z\|ECC Summit - Ecosystem Updates - Zcash
Community Forum
https://forum.zcashcommunity.com/t/onward-in-2025-ecc-update-from-z-ecc-summit/50102
They Grow Up So Fast: Zashi 2.0 - Zashi - Zcash Community Forum
https://forum.zcashcommunity.com/t/they-grow-up-so-fast-zashi-2-0/51030
Zashi Release Updates - Zashi - Zcash Community Forum
https://forum.zcashcommunity.com/t/zashi-release-updates/49101 Zashi
2.1: Enhanced Privacy with Tor (Beta) - Electric Coin Company
https://electriccoin.co/blog/zashi-2-1-enhanced-privacy-with-tor-beta/
Zcash privacy remains strongest of any cryptocurrency, even with recent
Chainalysis, Elliptic support - Electric Coin Company
https://electriccoin.co/blog/zcash-privacy-remains-strongest-of-any-cryptocurrency-3/
Brave Wallet adds shielded Zcash transactions on desktop, with Android
and iOS coming soon \| Brave https://brave.com/blog/shielded-zcash/
Zcash Fully Shielded Transactions Jump 70% to New Record in April
https://cointelegraph.com/news/zcash-fully-shielded-transactions-jump-70-to-new-record-in-april
Zcash Sapling Activation Delayed - Electric Coin Company
https://electriccoin.co/blog/zcash-sapling-activation-delayed/ \[PDF\]
Zcash Protocol Specification - Version 2024.5.1-386-g4b64ea ...
https://zips.z.cash/protocol/sapling.pdf Network Upgrade 5 - Z.Cash
https://z.cash/upgrade/nu5/19. 153 154 20. 60 176 1 224 90 91 92 93 94
97182 325104 193 4 5 6134 167 168 169 174 175 178 179 181 191 7 8170 171
172 173 188 910114 116 132 133 11 13 14 36 37 64 88 96100 106 107 108 12
23 89139 140 15 16 19 20 61 65 66 67 68 69 70 17 18 62 63123 21 22 71 72
73 74 26 27 34 51 52 59 60147 151 152 153 154 176 177 180 28 29 75 76 77
78112 129 130 131 30 31 58144 145 183 32 46 33 35 35

Zashi 2.0.3: Changes to Shielded Addresses - Electric Coin Company
https://electriccoin.co/blog/zashi-2-0-3-changes-to-shielded-addresses/
Zcash - Wikipedia https://en.wikipedia.org/wiki/Zcash Blossom upgrade
improves speed, scalability, capacity
https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/
The Zcash Blossom network upgrade is expected to be activated on ...
https://www.theblockbeats.info/en/news/6136 Zcash Price Analysis -
Transactions per day continues to rise
https://bravenewcoin.com/insights/zcash-price-analysis-transactions-per-day-continues-to-rise
Upgrade - Z.Cash https://z.cash/upgrade/ Zcash Shielded Assets -- Asset
Swaps and beyond - Applications - Zcash Community Forum
https://forum.zcashcommunity.com/t/zcash-shielded-assets-asset-swaps-and-beyond/44497
Heartwood - Z.Cash https://z.cash/upgrade/heartwood/ Zcash Canopy
https://z.cash/upgrade/canopy/ 2025/6 Zcash Protocol Roadmap - General -
Zcash Community Forum
https://forum.zcashcommunity.com/t/2025-6-zcash-protocol-roadmap/51760
ZIP 227: Issuance of Zcash Shielded Assets https://zips.z.cash/zip-0227
The Trailing Finality Layer: A stepping stone to proof of stake in Zcash
https://electriccoin.co/blog/the-trailing-finality-layer-a-stepping-stone-to-proof-of-stake-in-zcash/
ECC Roadmap: Q1 2025 - Electric Coin Company
https://electriccoin.co/blog/ecc-roadmap-q1-2025/ Ensuring Flexibility
and Sustainability of the Zcash Development Fund
https://forum.zcashcommunity.com/t/ensuring-flexibility-and-sustainability-of-the-zcash-development-fund-draft/46976?
page=2 Zcash Foundation - X
https://x.com/ZcashFoundation/status/1781321599838245173 Flexa and
Electric Coin Co. Announce Integration to Enable Instant Payments with
Zashi Wallet App at Thousands of Retail Locations
https://www.businesswire.com/news/home/20241126097369/en/Flexa-and-Electric-Coin-Co.-Announce-Integration-to-
Enable-Instant-Payments-with-Zashi-Wallet-App-at-Thousands-of-Retail-Locations
ECC Roadmap: Q3 2025 - Electric Coin Company
https://electriccoin.co/blog/ecc-roadmap-q3-2025/ QEDIT ZSA DEMO
12-19-2024 - YouTube https://www.youtube.com/watch?v=1MZMGC9ViyA Zashi:
A mobile wallet for Zcash. Built by ECC - Z.Cash
https://z.cash/ecosystem/zashi-wallet/38 39 79113 40 41 54 57143 149 150
155 156 160 185 42 49 43 44 45 55 56 47 48 83 84 85 86117 119 120 50 53
80 81 82 98190 87118 95 99101 102 111 164 189 103 157 158 162 165 166
192 105 109 110 125 126 127 128 115 161 186 121 122 36

ZecHub on X: "Zcash Shielded News \| Vol.43" / X
https://x.com/ZecHub/status/1955713596626813397 Gemini becomes first
regulated institution to support shielded Zcash ...
https://z.cash/gemini-becomes-first-regulated-institution-to-support-shielded-zcash-withdrawals/
You're One Step Closer to Financial Freedom With Shielded ZEC ...
https://www.gemini.com/blog/youre-one-step-closer-to-financial-freedom-with-shielded-zec-withdrawals
Zashi Wallet - Electric Coin Company https://electriccoin.co/zashi/
Measuring Shielded Adoption - Technology - Zcash Community Forum
https://forum.zcashcommunity.com/t/measuring-shielded-adoption/35022
Privacy Coins vs. Regulatory Compliance Statistics 2025 - CoinLaw
https://coinlaw.io/privacy-coins-vs-regulatory-compliance-statistics/
Zcash Community 🛡ᙇ on X: "ZSF is now NSM; the Network ...
https://twitter .com/zcash_community/status/1848496352163922240 Zcash
Shielded Assets (ZSA) - Free2Z
https://free2z.cash/zingolabs/zpage/zcash-shielded-assets-zsas Network
Upgrade Pipeline 2.0 - Electric Coin Company
https://electriccoin.co/blog/network-upgrade-pipeline-2-0/ Privacy
Tokens DASH, ZCH, XMR Take Hit as OKX Says ... - CoinDesk
https://www.coindesk.com/business/2023/12/29/privacy-tokens-dash-zch-xmr-take-hit-as-okx-says-it-will-suspend-trading124
135 136 137 138 141 142 146 148 159 163 184 187 37
