import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';
import { useState } from 'react';
import { ChevronDown, Crosshair, Shield, Eye, Radar, Twitter, Brain, Globe, Database, Bot, History, Lock, FileSearch, X, AlertTriangle } from 'lucide-react';

function App() {
  const [showDialog, setShowDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedTier, setSelectedTier] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !purpose) return;
    
    // Here you would typically send this to your backend
    console.log({ email, purpose, selectedTier });
    setSubmitted(true);
  };

  const openDialog = (tierName: string = '') => {
    setSelectedTier(tierName);
    setShowDialog(true);
  };

  return (
    <div className="w-full min-h-screen bg-black relative">
      {/* Fixed background */}
      <div className="fixed inset-0">
        <Canvas>
          <Scene />
        </Canvas>
      </div>
      
      {/* Scrollable content */}
      <div className="relative z-10">
        {/* Top Navigation */}
        <div className="w-full p-6 flex justify-between items-center">
          <div className="flex items-center gap-3 text-red-600">
            <img src="/logo/image.png" alt="Logo" className="w-8 h-8 object-contain" />
            <span className="text-2xl font-bold tracking-widest glow-text flicker">HIDDEN PROTOCOL</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/hiddenprotocols"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-red-900/20 text-red-600 rounded-none border border-red-900/50 hover:bg-red-900/30 transition-all duration-300 backdrop-blur-sm"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <button className="px-6 py-2.5 bg-red-600 text-black rounded-none border-2 border-red-900 hover:bg-red-700 transition-all duration-300 font-bold tracking-widest backdrop-blur-sm flex items-center gap-2">
              <span className="glow-text">BUY NOW</span>
            </button>
            <button 
              onClick={() => openDialog()}
              className="px-6 py-2.5 bg-red-900/20 text-red-600 rounded-none border border-red-900/50 hover:bg-red-900/30 transition-all duration-300 font-bold tracking-widest backdrop-blur-sm"
            >
              EARLY ACCESS
            </button>
          </div>
        </div>

        {/* Early Access Dialog */}
        {showDialog && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-black border-2 border-red-900/50 p-8 max-w-md w-full relative">
              <button
                onClick={() => {
                  setShowDialog(false);
                  setSelectedTier('');
                }}
                className="absolute top-4 right-4 text-red-600 hover:text-red-500"
              >
                <X className="w-6 h-6" />
              </button>

              {!submitted ? (
                <>
                  <h2 className="text-2xl font-bold text-red-600 mb-6 tracking-widest glow-text">
                    {selectedTier ? `REQUEST ${selectedTier} ACCESS` : 'REQUEST EARLY ACCESS'}
                  </h2>
                  
                  {/* Risk Warning */}
                  <div className="mb-6 p-4 border border-red-900/50 bg-red-900/10">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <p className="text-red-600 text-sm">
                        <span className="font-bold block mb-1">RISK DISCLOSURE:</span>
                        The Hidden Protocol AI service involves significant risks. By proceeding, you acknowledge that you're using this service at your own risk. We will assess each application individually and provide successful applicants with comprehensive safety instructions and secure access protocols.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-red-600 text-sm font-bold mb-2">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black border-2 border-red-900/50 p-3 text-red-600 placeholder-red-900/50 focus:border-red-600 transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label htmlFor="purpose" className="block text-red-600 text-sm font-bold mb-2">
                        WHY DO YOU WANT TO USE HIDDEN PROTOCOL AI?
                      </label>
                      <textarea
                        id="purpose"
                        required
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        className="w-full bg-black border-2 border-red-900/50 p-3 text-red-600 placeholder-red-900/50 focus:border-red-600 transition-colors h-32"
                        placeholder="Explain your intended use case..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-red-600 text-black font-bold tracking-widest hover:bg-red-700 transition-colors"
                    >
                      SUBMIT APPLICATION
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="mb-6">
                    <img src="/logo/image.png" alt="Logo" className="w-16 h-16 mx-auto" />
                  </div>
                  <h2 className="text-2xl font-bold text-red-600 mb-4 tracking-widest glow-text">APPLICATION RECEIVED</h2>
                  <p className="text-red-600 mb-6">
                    We will review your application and contact you with further instructions if approved.
                  </p>
                  <button
                    onClick={() => {
                      setShowDialog(false);
                      setSubmitted(false);
                      setEmail('');
                      setPurpose('');
                      setSelectedTier('');
                    }}
                    className="px-6 py-3 bg-red-900/20 text-red-600 border border-red-900/50 hover:bg-red-900/30 transition-colors font-bold tracking-widest"
                  >
                    CLOSE
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="min-h-screen flex flex-col items-center justify-center max-w-4xl mx-auto p-4">
          <h1 className="text-7xl font-bold text-red-600 mb-3 tracking-widest glow-text flicker uppercase">Hidden Protocol</h1>
          <p className="text-red-800 text-xl mb-12 text-center font-bold tracking-widest uppercase">
            Classified Infiltration System
          </p>

          {/* Quick Access */}
          <div className="flex gap-6 mt-8">
            {[
              { name: 'TARGET', icon: Crosshair },
              { name: 'BREACH', icon: Shield },
              { name: 'OBSERVE', icon: Eye },
              { name: 'SCAN', icon: Radar }
            ].map(({ name, icon: Icon }) => (
              <button
                key={name}
                className="px-6 py-3 bg-red-900/20 text-red-600/80 rounded-none border border-red-900/50 hover:bg-red-900/30 hover:text-red-600 transition-all duration-300 backdrop-blur-sm flex items-center gap-2 font-bold tracking-widest"
              >
                <Icon className="w-5 h-5" />
                {name}
              </button>
            ))}
          </div>

          <ChevronDown className="w-7 h-7 text-red-600/60 animate-bounce mt-20" />
        </div>

        {/* Features Section */}
        <div className="min-h-screen py-20 px-4 relative overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20 relative">
              <div className="absolute inset-0 bg-red-900/10 skew-y-3 -z-10"></div>
              <h2 className="text-[#ff6b00] text-4xl font-bold tracking-widest mb-4 glitch-text">HIDDEN PROTOCOL IS YOUR DIGITAL ARCHAEOLOGIST</h2>
              <p className="text-[#ff6b00] text-xl tracking-wider">UNLEASHED TO UNCOVER SUPPRESSED INFORMATION ACROSS THE DARK WEB</p>
            </div>
            
            <div className="chaotic-grid">
              {[
                {
                  title: 'Web Investigation',
                  description: 'Autonomously crawls through the depths of the internet, analyzing patterns and uncovering hidden connections in real-time.',
                  icon: Globe,
                  delay: '0s'
                },
                {
                  title: 'AI Wiki Articles',
                  description: 'Hidden Protocol generates wiki articles on suppressed information using uncensored LLM models.',
                  icon: Brain,
                  delay: '0.2s'
                },
                {
                  title: 'Blockchain Integration',
                  description: 'Operating on Solana blockchain to ensure transparency and immutability of discovered information.',
                  icon: Database,
                  delay: '0.4s'
                },
                {
                  title: 'AI Agents',
                  description: 'Autonomous AI agents work 24/7 to discover, verify, and archive suppressed information.',
                  icon: Bot,
                  delay: '0.6s'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="feature-card relative bg-black/80 backdrop-blur-sm border border-red-900/30 p-8 hover:border-red-600/50 transition-all duration-300"
                  style={{ '--delay': feature.delay } as React.CSSProperties}
                >
                  <feature.icon className="w-12 h-12 text-red-600 mb-4 transform transition-transform group-hover:scale-110 group-hover:rotate-12" />
                  <h3 className="text-red-600 text-xl font-bold mb-3 tracking-wider group-hover:glitch-text">{feature.title}</h3>
                  <p className="text-red-800/80 tracking-wide group-hover:text-red-600/80">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="min-h-screen py-20 px-4 relative overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-red-600 text-4xl font-bold tracking-widest mb-4 glitch-text">USE CASES</h2>
              <p className="text-red-800 text-xl tracking-wider">DISCOVER THE POWER OF HIDDEN PROTOCOL</p>
            </div>

            <div className="chaotic-grid">
              {[
                {
                  title: 'Historical Research',
                  description: 'Uncover hidden historical documents and suppressed narratives from various time periods.',
                  icon: History,
                  delay: '0s'
                },
                {
                  title: 'Secure Communication',
                  description: 'Enable encrypted communication channels for sensitive information exchange.',
                  icon: Lock,
                  delay: '0.2s'
                },
                {
                  title: 'Data Recovery',
                  description: 'Recover and restore deleted or hidden data from various sources.',
                  icon: FileSearch,
                  delay: '0.4s'
                },
                {
                  title: 'Pattern Analysis',
                  description: 'Identify hidden patterns and connections in large datasets.',
                  icon: Brain,
                  delay: '0.6s'
                }
              ].map((useCase, index) => (
                <div
                  key={index}
                  className="use-case-card relative bg-black/80 backdrop-blur-sm border border-red-900/30 p-8 hover:border-red-600/50 transition-all duration-300"
                  style={{ '--delay': useCase.delay } as React.CSSProperties}
                >
                  <useCase.icon className="w-12 h-12 text-red-600 mb-4" />
                  <h3 className="text-red-600 text-xl font-bold mb-3 tracking-wider">{useCase.title}</h3>
                  <p className="text-red-800/80 tracking-wide">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="min-h-screen py-20 px-4 relative overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-red-600 text-4xl font-bold tracking-widest mb-4 glitch-text">ACCESS TIERS</h2>
              <p className="text-red-800 text-xl tracking-wider">CHOOSE YOUR LEVEL OF INFILTRATION</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "GHOST",
                  price: "1,000,000",
                  description: "Basic infiltration capabilities",
                  features: [
                    "Limited data retrieval",
                    "Basic encryption protocols",
                    "24/7 autonomous scanning",
                    "Standard API access"
                  ]
                },
                {
                  name: "PHANTOM",
                  price: "10,000,000",
                  description: "Advanced infiltration suite",
                  features: [
                    "Enhanced data mining",
                    "Priority processing",
                    "Custom scanning patterns",
                    "Advanced API integration",
                    "Dedicated secure channel"
                  ],
                  featured: true
                },
                {
                  name: "SPECTER",
                  price: "CUSTOM",
                  description: "Ultimate infiltration system",
                  features: [
                    "Unlimited data retrieval",
                    "Military-grade encryption",
                    "Custom AI models",
                    "Priority support channel",
                    "Full API access",
                    "Custom protocols"
                  ]
                }
              ].map((tier, index) => (
                <div
                  key={index}
                  className={`relative ${
                    tier.featured
                      ? 'transform scale-105 z-10'
                      : ''
                  }`}
                >
                  <div
                    className={`h-full bg-black/80 backdrop-blur-sm border ${
                      tier.featured
                        ? 'border-red-600/50'
                        : 'border-red-900/30'
                    } p-8 hover:border-red-600/50 transition-all duration-300 relative overflow-hidden`}
                  >
                    {tier.featured && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
                    )}
                    
                    <h3 className="text-red-600 text-2xl font-bold mb-4 tracking-wider">{tier.name}</h3>
                    <div className="mb-6">
                      <span className="text-red-600 text-4xl font-bold">
                        {tier.price === 'CUSTOM' ? (
                          'CUSTOM'
                        ) : (
                          <>{tier.price} $HIDDEN</>
                        )}
                      </span>
                      {tier.price !== 'CUSTOM' && (
                        <span className="text-red-800/80">/month</span>
                      )}
                    </div>
                    <p className="text-red-800/80 mb-6">{tier.description}</p>
                    
                    <ul className="space-y-4 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-red-800/80">
                          <Shield className="w-4 h-4 text-red-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <button 
                      onClick={() => openDialog(tier.name)}
                      className={`w-full py-3 ${
                        tier.featured
                          ? 'bg-red-600 text-black hover:bg-red-700'
                          : 'bg-red-900/20 text-red-600 hover:bg-red-900/30'
                      } transition-all duration-300 font-bold tracking-widest`}
                    >
                      REQUEST ACCESS
                    </button>
                  </div>
                  
                  {tier.featured && (
                    <>
                      <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
                      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-red-600 to-transparent"></div>
                      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-red-600 to-transparent"></div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="w-full p-8 flex justify-center">
          <div className="flex gap-12 text-red-800/80 text-base font-bold tracking-widest">
            {['CLASSIFIED', 'RESTRICTED', 'ENCRYPTED'].map((item) => (
              <button key={item} className="gradient-border hover:text-red-600 transition-colors">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;