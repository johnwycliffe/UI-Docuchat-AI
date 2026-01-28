import React, { useState, useEffect } from 'react';
import { FileText, Upload, Send, Moon, Sun, ChevronDown, ChevronUp, MessageSquarePlus, Zap, Sparkles, X, Check } from 'lucide-react';

// Mock Data
const mockDocuments = [
  { id: '1', name: 'Product Requirements.pdf', status: 'ready', uploadedAt: '2024-01-20' },
  { id: '2', name: 'Financial Report Q4.pdf', status: 'ready', uploadedAt: '2024-01-21' },
  { id: '3', name: 'Research Paper.pdf', status: 'indexing', uploadedAt: '2024-01-22' },
  { id: '4', name: 'User Manual v2.pdf', status: 'ready', uploadedAt: '2024-01-23' },
];

const mockMessages = [
  {
    id: '1',
    type: 'user',
    content: 'What are the main features outlined in the product requirements?',
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    type: 'ai',
    content: 'Based on the Product Requirements document, the main features include: a real-time collaboration system, advanced search functionality with AI-powered filters, user authentication with SSO support, and a comprehensive analytics dashboard. The document emphasizes scalability and performance optimization as core priorities.',
    sources: [
      {
        documentName: 'Product Requirements.pdf',
        pageNumber: 3,
        snippet: 'The system shall support real-time collaboration with up to 100 concurrent users...',
      },
      {
        documentName: 'Product Requirements.pdf',
        pageNumber: 7,
        snippet: 'Advanced search functionality leveraging AI to provide contextual results...',
      },
      {
        documentName: 'Product Requirements.pdf',
        pageNumber: 12,
        snippet: 'Analytics dashboard providing insights into user behavior and system performance...',
      },
    ],
    timestamp: '10:31 AM',
  },
  {
    id: '3',
    type: 'user',
    content: 'What was the revenue growth in Q4?',
    timestamp: '10:35 AM',
  },
  {
    id: '4',
    type: 'ai',
    content: 'According to the Financial Report Q4, the company achieved a revenue growth of 24% year-over-year, reaching $12.3 million in Q4. This growth was primarily driven by enterprise subscription increases and expansion into new markets. The report highlights strong performance in the SaaS segment with a 31% growth rate.',
    sources: [
      {
        documentName: 'Financial Report Q4.pdf',
        pageNumber: 2,
        snippet: 'Total revenue for Q4 reached $12.3M, representing a 24% YoY increase...',
      },
      {
        documentName: 'Financial Report Q4.pdf',
        pageNumber: 5,
        snippet: 'Enterprise subscriptions grew by 31%, contributing significantly to overall growth...',
      },
    ],
    timestamp: '10:35 AM',
  },
];

// Components
const Sidebar = ({ hasDocuments, onDeleteDocument, isDark }) => {
  const [hoveredDoc, setHoveredDoc] = useState(null);

  return (
    <div className={`w-80 border-r flex flex-col transition-colors duration-300 ${
      isDark 
        ? 'border-gray-800/50 bg-[#1a1d24]' 
        : 'border-gray-200 bg-white'
    }`}>
      <div className={`p-5 border-b transition-colors duration-300 ${
        isDark ? 'border-gray-800/50' : 'border-gray-200'
      }`}>
        <div className="mb-5">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
              isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'
            }`}>
              <Sparkles className={`w-4 h-4 transition-colors duration-300 ${
                isDark ? 'text-emerald-500' : 'text-emerald-600'
              }`} />
            </div>
            <div>
              <h1 className={`text-lg font-bold transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>DocuChat AI</h1>
              <p className={`text-xs transition-colors duration-300 ${
                isDark ? 'text-emerald-500' : 'text-emerald-600'
              }`}>RAG-powered answers</p>
            </div>
          </div>
        </div>
        
        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]">
          <MessageSquarePlus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      <div className={`p-5 border-b transition-colors duration-300 ${
        isDark ? 'border-gray-800/50' : 'border-gray-200'
      }`}>
        <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 transition-colors duration-300 ${
          isDark ? 'text-gray-500' : 'text-gray-500'
        }`}>UPLOAD</h3>
        <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer group ${
          isDark 
            ? 'border-gray-700 hover:border-emerald-500/50 hover:bg-gray-800/20' 
            : 'border-gray-300 hover:border-emerald-500/50 hover:bg-gray-50'
        }`}>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 ${
            isDark 
              ? 'bg-gray-800 group-hover:bg-emerald-500/10' 
              : 'bg-gray-100 group-hover:bg-emerald-50'
          }`}>
            <Upload className={`w-6 h-6 group-hover:text-emerald-500 group-hover:-translate-y-0.5 transition-all duration-300 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`} />
          </div>
          <h3 className={`font-medium mb-1 group-hover:text-emerald-500 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>Upload PDF Documents</h3>
          <p className={`text-sm transition-colors duration-300 ${
            isDark ? 'text-gray-500' : 'text-gray-600'
          }`}>
            Drag & drop or <span className="text-emerald-500 group-hover:underline">browse</span>
          </p>
        </div>
      </div>

      <div className="flex-1 p-5 overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <FileText className={`w-4 h-4 transition-colors duration-300 ${
            isDark ? 'text-gray-500' : 'text-gray-500'
          }`} />
          <h2 className={`text-sm font-medium transition-colors duration-300 ${
            isDark ? 'text-gray-400' : 'text-gray-700'
          }`}>Documents</h2>
          {hasDocuments && (
            <span className={`ml-auto text-xs px-2 py-0.5 rounded-full transition-colors duration-300 ${
              isDark ? 'text-gray-500 bg-gray-800' : 'text-gray-600 bg-gray-100'
            }`}>
              {mockDocuments.length}
            </span>
          )}
        </div>
        
        {!hasDocuments ? (
          <div className="text-center py-8 animate-fadeIn">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 animate-pulse transition-colors duration-300 ${
              isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'
            }`}>
              <FileText className={`w-7 h-7 transition-colors duration-300 ${
                isDark ? 'text-emerald-500/50' : 'text-emerald-500/60'
              }`} />
            </div>
            <p className={`font-medium mb-1 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>No documents yet</p>
            <p className={`text-sm transition-colors duration-300 ${
              isDark ? 'text-gray-500' : 'text-gray-600'
            }`}>Upload PDFs to get started</p>
          </div>
        ) : (
          <div className="space-y-2">
            {mockDocuments.map((doc, index) => (
              <div
                key={doc.id}
                onMouseEnter={() => setHoveredDoc(doc.id)}
                onMouseLeave={() => setHoveredDoc(null)}
                style={{ animationDelay: `${index * 100}ms` }}
                className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer group animate-slideIn relative ${
                  isDark 
                    ? 'bg-gray-800/40 hover:bg-gray-800/70 border-gray-800/50 hover:border-emerald-500/30' 
                    : 'bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-emerald-500/30'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 ${
                    isDark ? 'bg-emerald-500/10 group-hover:bg-emerald-500/20' : 'bg-emerald-100 group-hover:bg-emerald-200'
                  }`}>
                    <FileText className={`w-4 h-4 transition-colors duration-300 ${
                      isDark ? 'text-emerald-500' : 'text-emerald-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate mb-1 group-hover:text-emerald-500 transition-colors duration-300 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {doc.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 transition-all duration-300 ${
                        doc.status === 'ready' 
                          ? 'bg-emerald-500/10 text-emerald-500' 
                          : 'bg-blue-500/10 text-blue-500'
                      }`}>
                        {doc.status === 'ready' && <Check className="w-3 h-3" />}
                        {doc.status === 'indexing' && (
                          <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        )}
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  {hoveredDoc === doc.id && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteDocument(doc.id);
                      }}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white rounded-md flex items-center justify-center transition-all duration-200 animate-fadeIn"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={`p-5 border-t transition-colors duration-300 ${
        isDark ? 'border-gray-800/50' : 'border-gray-200'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className={`text-xs transition-colors duration-300 ${
            isDark ? 'text-gray-500' : 'text-gray-600'
          }`}>Powered by Google Gemini</span>
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({ isDark }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-md animate-fadeIn">
        <div className={`w-32 h-32 rounded-3xl shadow-lg flex items-center justify-center mx-auto mb-8 hover:scale-105 transition-all duration-300 animate-float ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="relative">
            <FileText className={`w-16 h-16 transition-colors duration-300 ${
              isDark ? 'text-emerald-500' : 'text-emerald-600'
            }`} strokeWidth={2} />
            <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center animate-bounce ${
              isDark ? 'bg-emerald-500' : 'bg-emerald-600'
            }`}>
              <span className="text-white text-sm font-bold">?</span>
            </div>
          </div>
        </div>
        <h2 className={`text-3xl font-bold mb-4 animate-slideUp transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          DocuChat AI
        </h2>
        <h3 className={`text-xl font-semibold mb-3 animate-slideUp transition-colors duration-300 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`} style={{ animationDelay: '100ms' }}>
          About Your Documents
        </h3>
        <p className={`leading-relaxed animate-slideUp transition-colors duration-300 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`} style={{ animationDelay: '200ms' }}>
          Upload PDF documents to start asking questions. Our AI will analyze them and provide accurate, source-referenced answers.
        </p>
      </div>
    </div>
  );
};

const ChatMessage = ({ message, index, isDark }) => {
  const [showSources, setShowSources] = useState(false);

  if (message.type === 'user') {
    return (
      <div className="flex justify-end mb-6 animate-slideInRight" style={{ animationDelay: `${index * 100}ms` }}>
        <div className="max-w-2xl bg-emerald-500 text-white rounded-2xl rounded-tr-md px-5 py-3.5 shadow-sm hover:shadow-md hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-[1.01]">
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-6 animate-slideInLeft" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="max-w-2xl">
        <div className={`border rounded-2xl rounded-tl-md px-5 py-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <p className={`text-sm leading-relaxed transition-colors duration-300 ${
            isDark ? 'text-gray-100' : 'text-gray-900'
          }`}>
            {message.content}
          </p>

          {message.sources && message.sources.length > 0 && (
            <div className={`mt-4 pt-4 border-t transition-colors duration-300 ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <button
                onClick={() => setShowSources(!showSources)}
                className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 group ${
                  isDark 
                    ? 'text-gray-300 hover:text-emerald-400' 
                    : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                <FileText className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>{message.sources.length} Sources</span>
                {showSources ? 
                  <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" /> : 
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
                }
              </button>

              {showSources && (
                <div className="mt-3 space-y-2 animate-slideDown">
                  {message.sources.map((source, idx) => (
                    <div
                      key={idx}
                      style={{ animationDelay: `${idx * 50}ms` }}
                      className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer hover:scale-[1.02] animate-fadeIn ${
                        isDark 
                          ? 'bg-gray-900/50 border-gray-700 hover:border-emerald-700' 
                          : 'bg-gray-50 border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex items-start gap-2 mb-1.5">
                        <FileText className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                          isDark ? 'text-emerald-400' : 'text-emerald-600'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-medium truncate transition-colors duration-300 ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {source.documentName}
                          </p>
                          <p className={`text-xs mt-0.5 transition-colors duration-300 ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            Page {source.pageNumber}
                          </p>
                        </div>
                      </div>
                      <p className={`text-xs leading-relaxed transition-colors duration-300 ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {source.snippet}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <p className={`text-xs mt-2 ml-1 transition-colors duration-300 ${
          isDark ? 'text-gray-500' : 'text-gray-400'
        }`}>
          {message.timestamp}
        </p>
      </div>
    </div>
  );
};

const ChatArea = ({ isDark, toggleTheme, hasDocuments }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (input.trim() && hasDocuments) {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
      setInput('');
    }
  };

  return (
    <div className={`flex-1 flex flex-col transition-colors duration-300 ${
      isDark ? 'bg-[#0f1117]' : 'bg-gray-50'
    }`}>
      <div className={`border-b px-6 py-4 flex items-center justify-between transition-colors duration-300 ${
        isDark ? 'border-gray-800/50 bg-[#1a1d24]' : 'border-gray-200 bg-white'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center group transition-all duration-300 hover:scale-110 ${
            isDark ? 'bg-emerald-500/10 hover:bg-emerald-500/20' : 'bg-emerald-500/10 hover:bg-emerald-500/20'
          }`}>
            <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-500 group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div>
            <h2 className={`text-lg font-semibold transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Chat with Documents
            </h2>
            <p className={`text-xs transition-colors duration-300 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Upload documents to start
            </p>
          </div>
        </div>
        
        <button
          onClick={toggleTheme}
          className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group ${
            isDark 
              ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
              : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
          }`}
        >
          {isDark ? (
            <Moon className="w-5 h-5 text-gray-300 group-hover:rotate-12 transition-transform duration-300" />
          ) : (
            <Sun className="w-5 h-5 text-gray-700 group-hover:rotate-90 transition-transform duration-300" />
          )}
        </button>
      </div>

      {!hasDocuments ? (
        <EmptyState isDark={isDark} />
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {mockMessages.map((message, index) => (
              <ChatMessage key={message.id} message={message} index={index} isDark={isDark} />
            ))}
            {isTyping && (
              <div className="flex justify-start mb-6 animate-slideInLeft">
                <div className={`max-w-2xl border rounded-2xl rounded-tl-md px-5 py-4 shadow-sm transition-colors duration-300 ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={`border-t p-6 transition-colors duration-300 ${
        isDark ? 'border-gray-800/50 bg-[#1a1d24]' : 'border-gray-200 bg-white'
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={hasDocuments ? "Ask a question about your documents..." : "Upload documents to start chatting..."}
              disabled={!hasDocuments}
              className={`w-full border rounded-xl px-4 py-3.5 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:scale-[1.01] ${
                isDark 
                  ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500' 
                  : 'bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-400'
              }`}
            />
            <button 
              onClick={handleSend}
              disabled={!hasDocuments || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 text-white rounded-lg flex items-center justify-center transition-all duration-300 disabled:cursor-not-allowed hover:scale-110 active:scale-95 hover:shadow-lg hover:shadow-emerald-500/30"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            <Sparkles className="w-3 h-3 text-gray-400 animate-pulse" />
            <p className={`text-xs transition-colors duration-300 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              AI responses are generated based on your document content
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App
export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [hasDocuments, setHasDocuments] = useState(false);

  useEffect(() => {
    const htmlEl = document.documentElement;
    if (isDark) {
      htmlEl.classList.add('dark');
    } else {
      htmlEl.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleDeleteDocument = (id) => {
    console.log('Delete document:', id);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateY(-10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from { 
            opacity: 0;
            transform: translateX(-20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from { 
            opacity: 0;
            transform: translateX(20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out forwards;
        }
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
      
      <Sidebar hasDocuments={hasDocuments} onDeleteDocument={handleDeleteDocument} isDark={isDark} />
      <ChatArea isDark={isDark} toggleTheme={toggleTheme} hasDocuments={hasDocuments} />
      
      {/* Toggle documents button for demo */}
      <button
        onClick={() => setHasDocuments(!hasDocuments)}
        className="fixed bottom-4 right-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium shadow-lg z-50 transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-emerald-500/30"
      >
        {hasDocuments ? 'Clear Documents' : 'Load Documents'}
      </button>
    </div>
  );
}