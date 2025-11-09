import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Wallet, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { toast } from 'sonner@2.0.3'
import { motion } from 'motion/react'

interface WalletState {
  address: string | null
  isConnected: boolean
  balance: string | null
  chainId: number | null
}

interface WalletConnectProps {
  isDarkTheme?: boolean
}

export function WalletConnect({ isDarkTheme = false }: WalletConnectProps) {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    balance: null,
    chainId: null,
  })
  const [isConnecting, setIsConnecting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    checkIfWalletIsConnected()
    
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [])

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return

      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      
      if (accounts.length > 0) {
        const account = accounts[0]
        const chainId = await window.ethereum.request({ method: 'eth_chainId' })
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [account, 'latest'],
        })
        
        setWallet({
          address: account,
          isConnected: true,
          balance: formatBalance(balance),
          chainId: parseInt(chainId, 16),
        })
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error)
    }
  }

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error('MetaMask not detected', {
        description: 'Please install MetaMask to connect your wallet',
      })
      return
    }

    try {
      setIsConnecting(true)
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (accounts.length > 0) {
        const account = accounts[0]
        const chainId = await window.ethereum.request({ method: 'eth_chainId' })
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [account, 'latest'],
        })

        setWallet({
          address: account,
          isConnected: true,
          balance: formatBalance(balance),
          chainId: parseInt(chainId, 16),
        })

        toast.success('Wallet Connected!', {
          description: `Connected to ${shortenAddress(account)}`,
        })
        
        setIsOpen(false)
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error)
      toast.error('Connection Failed', {
        description: error.message || 'Failed to connect wallet',
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setWallet({
      address: null,
      isConnected: false,
      balance: null,
      chainId: null,
    })
    toast.info('Wallet Disconnected')
  }

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet()
    } else {
      setWallet((prev) => ({ ...prev, address: accounts[0] }))
      toast.info('Account Changed', {
        description: `Switched to ${shortenAddress(accounts[0])}`,
      })
    }
  }

  const handleChainChanged = () => {
    window.location.reload()
  }

  const formatBalance = (balanceHex: string): string => {
    const balanceWei = parseInt(balanceHex, 16)
    const balanceEth = balanceWei / 1e18
    return balanceEth.toFixed(4)
  }

  const shortenAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getChainName = (chainId: number): string => {
    const chains: { [key: number]: string } = {
      1: 'Ethereum Mainnet',
      5: 'Goerli Testnet',
      11155111: 'Sepolia Testnet',
      137: 'Polygon Mainnet',
      80001: 'Polygon Mumbai',
      56: 'BSC Mainnet',
      97: 'BSC Testnet',
    }
    return chains[chainId] || `Chain ID: ${chainId}`
  }

  if (wallet.isConnected) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className={`gap-2 ${isDarkTheme ? 'border-gray-600 text-white hover:bg-white/10 hover:text-white hover:border-gray-500' : ''}`}
          >
            <CheckCircle className="h-4 w-4 text-green-500" />
            {shortenAddress(wallet.address!)}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Wallet Connected</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-green-700 dark:text-green-300">Connected</span>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Address</p>
                  <p className="text-sm font-mono break-all">{wallet.address}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Balance</p>
                  <p className="text-sm">{wallet.balance} ETH</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Network</p>
                  <p className="text-sm">{getChainName(wallet.chainId!)}</p>
                </div>
              </div>
            </Card>
            <Button onClick={disconnectWallet} variant="destructive" className="w-full">
              Disconnect Wallet
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className={`gap-2 ${isDarkTheme ? 'border-gray-600 text-white hover:bg-white/10 hover:text-white hover:border-gray-500' : ''}`}
        >
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {!window.ethereum ? (
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border-orange-200 dark:border-orange-800">
              <div className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-700 dark:text-orange-300 mb-1">
                    MetaMask Not Detected
                  </p>
                  <p className="text-xs text-orange-600 dark:text-orange-400 mb-3">
                    Please install MetaMask to connect your wallet and access Web3 features.
                  </p>
                  <Button
                    size="sm"
                    onClick={() => window.open('https://metamask.io/download/', '_blank')}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Install MetaMask
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="w-full h-auto p-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 w-full">
                        <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center">
                          <svg viewBox="0 0 40 40" className="h-8 w-8">
                            <path fill="#E2761B" d="M32.8 3.8L20.5 12.8l2.3-5.4z"/>
                            <path fill="#E4761B" d="M7.2 3.8l12.2 9.1-2.2-5.5z"/>
                            <path fill="#D7C1B3" d="M27.9 27.3l-3.3 5 7.1 2 2-6.9z"/>
                            <path fill="#E4761B" d="M6.6 27.4l2 6.9 7-2-3.2-5z"/>
                          </svg>
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold">MetaMask</p>
                          <p className="text-xs opacity-90">Connect with MetaMask Wallet</p>
                        </div>
                      </div>
                    </>
                  )}
                </Button>
              </motion.div>

              <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  <strong>Why connect your wallet?</strong>
                  <br />
                  • Claim NFT certificates for completed hackathons
                  <br />
                  • Receive prizes directly to your wallet
                  <br />
                  • Verify your identity on the blockchain
                  <br />
                  • Access exclusive Web3 features
                </p>
              </Card>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Type declarations for window.ethereum
declare global {
  interface Window {
    ethereum?: any
  }
}
