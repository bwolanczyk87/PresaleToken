# TSTK Presale

This is a dApp for the presale of TSTK tokens. The pre-sale runs in 24-hour stages and this app lets you purchase tokens as per the price of the current stage. The app runs on the Polygon Mumbai chain

The application is hosted here:
[Vercel Link](https://tstk-beincrypto.vercel.app/)



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Yarn or npm (This guide will use Yarn)

### Installation

1. Clone this repository:

```bash
git https://github.com/jillo-abdullahi/tstk-beincrypto.git
```

2. Navigate into the project directory:

```bash
cd tstk-beincrypto
```

3. Install the dependencies:

```bash
yarn
```
4. Create a `.env` file and add the following values. You'll need an Alchemy API key as well as your walletConnect project key. 
```
NEXT_PUBLIC_ALCHEMY_ID=
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
NEXT_PUBLIC_TSTK_TOKEN_ADDRESS=
NEXT_PUBLIC_PRESALE_CONTRACT_ADDRESS=
```

To obtain an Alchemy key head over to [the Alchemy website](https://alchemy.com/).
For the Wallet project key, you'll need to create a free project [here](https://cloud.walletconnect.com/sign-in) and get your key from the project dashboard.

### Running the Application

Start the application in development mode:

```bash
yarn dev
```

Then open http://localhost:3000 with your web browser to see the result.

### Testing the Application

The app has tests written using the Jest library:

```bash
yarn jest
```

### Deployment

To create an optimized production build:

```bash
yarn build
```

You can then serve the built application with `yarn start`.

```bash
yarn start
```

## Built With

- [Next.js](https://nextjs.org/) - The React Framework
- [ConnectKit](https://docs.family.co/connectkit) - For blockchain wallet connections.
- [Wagmi](https://wagmi.sh/) - For smart contract calls.
- [TypeScript](https://www.typescriptlang.org/) - Used for static typing
- [Mantine ](https://mantine.dev/) - UI components library.


