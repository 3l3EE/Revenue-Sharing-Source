import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { ArtifactNFTDeployed } from "../generated/schema"
import { ArtifactNFTDeployed as ArtifactNFTDeployedEvent } from "../generated/EventOrganizerService/EventOrganizerService"
import { handleArtifactNFTDeployed } from "../src/event-organizer-service"
import { createArtifactNFTDeployedEvent } from "./event-organizer-service-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let artifactNFTAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let name = "Example string value"
    let symbol = "Example string value"
    let ownerAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let baseURI = "Example string value"
    let newArtifactNFTDeployedEvent = createArtifactNFTDeployedEvent(
      artifactNFTAddress,
      name,
      symbol,
      ownerAddress,
      baseURI
    )
    handleArtifactNFTDeployed(newArtifactNFTDeployedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ArtifactNFTDeployed created and stored", () => {
    assert.entityCount("ArtifactNFTDeployed", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ArtifactNFTDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "artifactNFTAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ArtifactNFTDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "ArtifactNFTDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "symbol",
      "Example string value"
    )
    assert.fieldEquals(
      "ArtifactNFTDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "ownerAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ArtifactNFTDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "baseURI",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
