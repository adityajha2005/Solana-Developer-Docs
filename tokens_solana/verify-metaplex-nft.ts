import {
    mplTokenMetadata,
    verifyCollectionV1,
    findMetadataPda,
  } from "@metaplex-foundation/mpl-token-metadata";
  import {
    airdropIfRequired,
    getExplorerLink,
    getKeypairFromFile,
  } from "@solana-developers/helpers";
  import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
  import { keypairIdentity, publicKey } from "@metaplex-foundation/umi";
  import { Connection, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
  
  const connection = new Connection(clusterApiUrl("devnet"));
  
  const user = await getKeypairFromFile();
  
  const collectionAddress = publicKey("EXE1Y4fypcHgVu56X1N66gb2GtPUUgwP1oR1ehatBpmC");
  
  const nftAddress = publicKey("42vk1tn1xBgktorceGe8mquzgVhapx649Pr8Sbqdbm8H");
  
  await airdropIfRequired(
    connection,
    user.publicKey,
    1 * LAMPORTS_PER_SOL,
    0.1 * LAMPORTS_PER_SOL
  );
  
  console.log("Loaded user:", user.publicKey.toBase58());
  
  // Create Umi Instance, using the same endpoint as our connection,
  // and using our user to sign transactions
  const umi = createUmi(connection.rpcEndpoint).use(mplTokenMetadata());
  const umiKeypair = umi.eddsa.createKeypairFromSecretKey(user.secretKey);
  umi.use(keypairIdentity(umiKeypair));
  
  // See https://developers.metaplex.com/token-metadata/collections
  const transaction = await verifyCollectionV1(umi, {
    // The metadata PDA for the NFT we want to verify inside the collection.
    metadata: findMetadataPda(umi, { mint: nftAddress }),
    // The Collection NFT that is already set on the Metadata account of the NFT but not yet verified.
    collectionMint: collectionAddress,
    // The Update Authority of the Collection NFT as a signer, in this case the umiKeypair
    authority: umi.identity,
  });
  
  transaction.sendAndConfirm(umi);
  
  console.log(
    `✅ NFT ${nftAddress} verified as member of collection ${collectionAddress}! See Explorer at ${getExplorerLink(
      "address",
      nftAddress,
      "devnet"
    )}`
  );
  
  console.log("✅ Finished successfully!");
// ✅ NFT 42vk1tn1xBgktorceGe8mquzgVhapx649Pr8Sbqdbm8H verified as member of collection EXE1Y4fypcHgVu56X1N66gb2GtPUUgwP1oR1ehatBpmC! 
// See Explorer at https://explorer.solana.com/address/42vk1tn1xBgktorceGe8mquzgVhapx649Pr8Sbqdbm8H?cluster=devnet
// ✅ Finished successfully!