export const CROWDFUND_ADDRESS = '0xC80dD81c1F870b22bB6A3B6aA429AC528F4Fd5ea';

export const CROWDFUND_ABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: '_id', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'caller', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'Donate',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint256', name: 'id', type: 'uint256' }],
    name: 'DropCampaign',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint256', name: 'id', type: 'uint256' }],
    name: 'PayoutOnGoalMet',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'id', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'caller', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'Reimburse',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'id', type: 'uint256' },
      { indexed: false, internalType: 'address', name: 'creator', type: 'address' },
      { indexed: false, internalType: 'string', name: 'title', type: 'string' },
      { indexed: false, internalType: 'string', name: 'description', type: 'string' },
      { indexed: false, internalType: 'string', name: 'img_url', type: 'string' },
      { indexed: false, internalType: 'uint256', name: 'goal', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'tier1Amount', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'minContribution', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'startTime', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'endTime', type: 'uint256' }
    ],
    name: 'StartCampaign',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: '_id', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'caller', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'Withdraw',
    type: 'event'
  },
  {
    inputs: [],
    name: 'campaignCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: '_id', type: 'uint256' }],
    name: 'donate',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: '_id', type: 'uint256' }],
    name: 'dropCampaign',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getAllCampaigns',
    outputs: [
      {
        components: [
          { internalType: 'address payable', name: 'creator', type: 'address' },
          { internalType: 'string', name: 'title', type: 'string' },
          { internalType: 'string', name: 'description', type: 'string' },
          { internalType: 'string', name: 'img_url', type: 'string' },
          { internalType: 'uint256', name: 'currentAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'goal', type: 'uint256' },
          { internalType: 'uint256', name: 'minContribution', type: 'uint256' },
          { internalType: 'uint256', name: 'tier1Amount', type: 'uint256' },
          { internalType: 'uint32', name: 'startTime', type: 'uint32' },
          { internalType: 'uint32', name: 'endTime', type: 'uint32' },
          { internalType: 'bool', name: 'claimed', type: 'bool' }
        ],
        internalType: 'struct Crowdfund.Campaign[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: '_id', type: 'uint256' }],
    name: 'getTierReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'ongoingCampaigns',
    outputs: [
      { internalType: 'address payable', name: 'creator', type: 'address' },
      { internalType: 'string', name: 'title', type: 'string' },
      { internalType: 'string', name: 'description', type: 'string' },
      { internalType: 'string', name: 'img_url', type: 'string' },
      { internalType: 'uint256', name: 'currentAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'goal', type: 'uint256' },
      { internalType: 'uint256', name: 'minContribution', type: 'uint256' },
      { internalType: 'uint256', name: 'tier1Amount', type: 'uint256' },
      { internalType: 'uint32', name: 'startTime', type: 'uint32' },
      { internalType: 'uint32', name: 'endTime', type: 'uint32' },
      { internalType: 'bool', name: 'claimed', type: 'bool' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: '_id', type: 'uint256' }],
    name: 'payoutOnGoalMet',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'address', name: '', type: 'address' }
    ],
    name: 'potentialDonations',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: '_id', type: 'uint256' }],
    name: 'reimburse',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'retrieveAllBackedCampaigns',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'retrieveAllCreatedCampaigns',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'address', name: '', type: 'address' }
    ],
    name: 'rewarded',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'string', name: '_title', type: 'string' },
      { internalType: 'string', name: '_description', type: 'string' },
      { internalType: 'string', name: '_img_url', type: 'string' },
      { internalType: 'uint256', name: '_goal', type: 'uint256' },
      { internalType: 'uint256', name: '_minContribution', type: 'uint256' },
      { internalType: 'uint256', name: '_tier1Amount', type: 'uint256' },
      { internalType: 'uint32', name: '_startTime', type: 'uint32' },
      { internalType: 'uint32', name: '_endTime', type: 'uint32' }
    ],
    name: 'startCampaign',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_id', type: 'uint256' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' }
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  }
];
