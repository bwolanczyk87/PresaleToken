export const ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_saleToken","internalType":"address"}]},{"type":"error","name":"EnforcedPause","inputs":[]},{"type":"error","name":"ExpectedPause","inputs":[]},{"type":"error","name":"OwnableInvalidOwner","inputs":[]},{"type":"error","name":"OwnableUnauthorizedAccount","inputs":[]},{"type":"error","name":"ReentrancyGuardReentrantCall","inputs":[]},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Paused","inputs":[{"type":"address","name":"account","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"Sale","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"stage","internalType":"uint256","indexed":true},{"type":"uint256","name":"qty","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Unpaused","inputs":[{"type":"address","name":"account","internalType":"address","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint64","name":"","internalType":"uint64"}],"name":"STAGE_BLOCKS_DURATION","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"STAGE_MAX_TOKENS","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"STAGE_MAX_WALLET_BUY","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint64","name":"","internalType":"uint64"}],"name":"STAGE_PRICE_INCREMENT","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint128","name":"","internalType":"uint128"}],"name":"UNIT_PRICE","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint128","name":"","internalType":"uint128"}],"name":"blockStart","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"currentStage","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"currentStageAvailableAmount","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint128","name":"","internalType":"uint128"}],"name":"currentStageBlockStart","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"currentStageMaxAmount","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"currentStagePrice","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"currentStageSoldAmount","inputs":[{"type":"address","name":"to","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"pause","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"paused","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"saleToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"soldAmountPerWallet","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"stageAvailableAmount","inputs":[{"type":"uint8","name":"","internalType":"uint8"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"stageMaxAmount","inputs":[{"type":"uint8","name":"","internalType":"uint8"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint128","name":"","internalType":"uint128"}],"name":"stagePrices","inputs":[{"type":"uint128","name":"","internalType":"uint128"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"startSale","inputs":[{"type":"uint256","name":"start","internalType":"uint256"}]},{"type":"function","stateMutability":"payable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"tokenSale","inputs":[{"type":"uint256","name":"qty","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"unpause","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[]}]