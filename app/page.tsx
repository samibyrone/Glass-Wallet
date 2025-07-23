import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, Globe, Users, ArrowRight, CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="border-b bg-blue-700/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between mb-5">
          <div className="flex items-center space-x-2 mt-5">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-4xl font-bold text-slate-900">Glass Wallet</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8 gap-10 mt-5">
            <Link href="#features" className="text-slate-600 text-xl hover:text-slate-900 transition-colors font-semibold">
              Features
            </Link>
            <Link href="#integration" className="text-slate-600 text-xl hover:text-slate-900 transition-colors font-semibold">
              Integration
            </Link>
            <Link href="#security" className="text-slate-600 text-xl hover:text-slate-900 transition-colors font-semibold">
              Security
            </Link>
          </nav>
          <div className="flex items-center mt-5">
            <Link href="/auth/login">
              <Button variant="ghost" className="font-semibold text-lg">Sign In</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="font-semibold text-lg text-gray-400 bg-black hover:text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center mt-30 mb-30">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Enum Glass Wallet
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Infrastructure
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed font-semibold">
              Seamlessly integrate crypto and fiat wallet functionality into your platform. Built for enterprises,
              designed for scale, secured by blockchain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center font-semibold">
              <Link href="/auth/register">
                <Button size="lg" className="px-8 py-3 font-bold hover:text-white text-gray-400 bg-black">
                  Start Integration
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto mt-30 mb-30">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Complete Wallet Solution</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-semibold">
              Everything you need to integrate wallet functionality into your platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Secure by Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Built on Sui blockchain with enterprise-grade security and KYC compliance
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Instant Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Lightning-fast P2P transfers, bulk disbursements, and real-time balance updates
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Globe className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Multi-Currency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Support for both fiat and cryptocurrency with seamless on/off-ramp integration
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Enterprise Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Scalable infrastructure designed for high-volume enterprise applications
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="integration" className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto mt-30 mb-30">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple Integration Process</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-semibold">
              Get your wallet infrastructure up and running in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Company Registration</h3>
              <p className="text-slate-600">Register your company and get unique API credentials for integration</p>
            </div>

            <div className="text-center bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">User Onboarding</h3>
              <p className="text-slate-600">Seamlessly onboard your users with KYC verification and wallet creation</p>
            </div>

            <div className="text-center bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Go Live</h3>
              <p className="text-slate-600">Start processing transactions with full wallet functionality</p>
            </div>
          </div>
        </div>
      </section>

      <section id="security" className="py-20 px-4 bg-white">
        <div className="container mx-auto mt-30 mb-30">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Enterprise-Grade Security</h2>
              <p className="text-lg text-slate-600 mb-8">
                Built with security at its core, Glass Wallet provides the infrastructure you need to handle financial
                transactions with confidence.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-slate-700">Blockchain-based transaction ledger</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-slate-700">KYC/AML compliance built-in</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-slate-700">Multi-signature wallet security</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-slate-700">Real-time fraud detection</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
                  <div className="text-sm text-slate-600">Uptime SLA</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">256-bit</div>
                  <div className="text-sm text-slate-600">Encryption</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">SOC 2</div>
                  <div className="text-sm text-slate-600">Compliant</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                  <div className="text-sm text-slate-600">Monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center mt-20 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Platform?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join leading companies who trust Glass Wallet for their financial infrastructure
          </p>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary" className="px-8 py-3 font-bold hover:text-black text-gray-700 bg-white">
              Start Your Integration Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="container mx-auto mt-30">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="text-xl font-bold">Glass Wallet</span>
              </div>
              <p className="text-slate-400">Enterprise wallet infrastructure for the modern economy</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Glass Wallet. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
