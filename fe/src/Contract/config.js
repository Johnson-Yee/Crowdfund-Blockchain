export const CROWDFUND_ADDRESS = '0x7a67D95CDDfeA292f202d9e55Bb321FDF8BE29b0';

export const CROWDFUND_ABI = [
  {
    inputs: [{ internalType: 'address', name: '_token', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
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
      { indexed: false, internalType: 'uint256', name: 'goal', type: 'uint256' },
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
    inputs: [
      { internalType: 'uint256', name: '_id', type: 'uint256' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' }
    ],
    name: 'donate',
    outputs: [],
    stateMutability: 'nonpayable',
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
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'ongoingCampaigns',
    outputs: [
      { internalType: 'address', name: 'creator', type: 'address' },
      { internalType: 'uint256', name: 'minContribution', type: 'uint256' },
      { internalType: 'uint256', name: 'currentAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'goal', type: 'uint256' },
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
    stateMutability: 'nonpayable',
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
    inputs: [
      { internalType: 'uint256', name: '_goal', type: 'uint256' },
      { internalType: 'uint32', name: '_startTime', type: 'uint32' },
      { internalType: 'uint32', name: '_endTime', type: 'uint32' }
    ],
    name: 'startCampaign',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'token',
    outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_id', type: 'uint256' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' }
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
