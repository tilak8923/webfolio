'use client';

import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, ShieldAlert, ShieldCheck, ChevronRight, Play } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LogLine {
  text: string;
  type: 'input' | 'system' | 'success' | 'warning' | 'error';
}

export default function CyberSandbox() {
  const [history, setHistory] = useState<LogLine[]>([
    { text: 'Tilak Dev & AI Sandbox [Version 1.1.0]', type: 'system' },
    { text: '(c) 2026 Tilak Tiwari. Full-Stack Dev & AI/ML Exploration.', type: 'system' },
    { text: 'Type "help" to list available development & AI commands.', type: 'system' },
    { text: '', type: 'system' },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Autofocus input
  const focusTerminal = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    focusTerminal();
  }, []);

  const addLines = (lines: LogLine[], delay = 100) => {
    setIsProcessing(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        const lineToAdd = lines[i];
        setHistory((prev) => [...prev, lineToAdd]);
        i++;
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        setTimeout(focusTerminal, 50);
      }
    }, delay);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;

    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Echo input
    setHistory((prev) => [...prev, { text: `tilak@dev-guest:~$ ${trimmedInput}`, type: 'input' }]);
    setInput('');

    const [cmd, ...args] = trimmedInput.split(' ');
    const command = cmd.toLowerCase();
    const arg = args.join(' ');

    switch (command) {
      case 'clear':
        setHistory([]);
        break;

      case 'help':
        addLines([
          { text: 'Available Dev & AI Sandbox Commands:', type: 'system' },
          { text: '  train             - Simulate training a machine learning model on a dataset', type: 'system' },
          { text: '  predict <value>   - Run regression model inference on climate factors', type: 'system' },
          { text: '  data              - Print a summary analysis of a sample analytics dataset', type: 'system' },
          { text: '  scan <domain/IP>  - Run simulated security audit (demonstrates security interest)', type: 'system' },
          { text: '  decrypt <text>    - Run cryptographic decryption simulation or Base64 decoding', type: 'system' },
          { text: '  about             - Learn about Tilak\'s dev profile & AI/ML journey', type: 'system' },
          { text: '  clear             - Clear terminal screen history', type: 'system' },
        ], 80);
        break;

      case 'about':
        addLines([
          { text: 'Full-Stack & AI/ML Portfolio Focus:', type: 'success' },
          { text: '  I build full-stack web applications using Next.js, Node.js, MongoDB, and Firebase.', type: 'system' },
          { text: '  I explore Data Science and Machine Learning models using Python, Pandas, and Scikit-Learn.', type: 'system' },
          { text: '  I also study Cybersecurity to build secure codebases (NextAuth, secure database rules, inputs verification).', type: 'system' },
        ], 100);
        break;

      case 'train':
        addLines([
          { text: '[+] Loading food waste dataset blocks (10,000 samples)...', type: 'system' },
          { text: '[+] Splitting data: 80% Train, 20% Test...', type: 'system' },
          { text: '[+] Initializing Random Forest Regressor and Dense Neural Network layers...', type: 'system' },
          { text: '  Epoch 1/5: [========>] loss: 0.824 - val_loss: 0.852 - accuracy: 72.4%', type: 'warning' },
          { text: '  Epoch 2/5: [==========>] loss: 0.412 - val_loss: 0.448 - accuracy: 83.1%', type: 'warning' },
          { text: '  Epoch 3/5: [============>] loss: 0.228 - val_loss: 0.251 - accuracy: 89.4%', type: 'warning' },
          { text: '  Epoch 4/5: [=============>] loss: 0.142 - val_loss: 0.165 - accuracy: 91.2%', type: 'warning' },
          { text: '  Epoch 5/5: [==============>] loss: 0.089 - val_loss: 0.102 - accuracy: 94.3%', type: 'success' },
          { text: '[+] Model training completed. Save model to disk: food_waste_reduction_model.pkl', type: 'success' },
        ], 120);
        break;

      case 'predict':
        if (!arg) {
          setHistory((prev) => [...prev, { text: 'Error: Input value required. Usage: predict <supply_margin_percent>', type: 'error' }]);
          break;
        }
        const num = parseFloat(arg);
        if (isNaN(num)) {
          setHistory((prev) => [...prev, { text: 'Error: Input must be a valid number.', type: 'error' }]);
          break;
        }
        const estimatedYield = (num * 0.48 + 5.2).toFixed(2);
        addLines([
          { text: `[+] Loading food_waste_reduction_model.pkl weights...`, type: 'system' },
          { text: `[+] Running model inference for Supply Margin = ${num}%...`, type: 'system' },
          { text: `[+] Estimated Food Waste Reduction: ${estimatedYield}%`, type: 'success' },
          { text: `[+] Confidence Index: 94.3%`, type: 'success' },
        ], 100);
        break;

      case 'data':
        addLines([
          { text: '---------------------------------------------------------', type: 'system' },
          { text: '  PM2.5 (μg/m³) |  PM10 (μg/m³) |  CO (ppm)  |  AQI Category', type: 'system' },
          { text: '---------------------------------------------------------', type: 'system' },
          { text: '  12            |  18           |  0.4       |  Good', type: 'success' },
          { text: '  45            |  62           |  1.2       |  Moderate', type: 'success' },
          { text: '  92            |  120          |  2.5       |  Unhealthy', type: 'success' },
          { text: '  15            |  25           |  0.5       |  Good', type: 'success' },
          { text: '  115           |  145          |  3.1       |  Unhealthy', type: 'success' },
          { text: '---------------------------------------------------------', type: 'system' },
          { text: '[+] Printed 5 of 5,000 AQI sensor records. Run "train" to fit predictive ML models.', type: 'system' },
        ], 100);
        break;

      case 'decrypt':
        if (!arg) {
          setHistory((prev) => [...prev, { text: 'Error: Ciphertext required. Usage: decrypt <base64>', type: 'error' }]);
          break;
        }
        try {
          // Check if Base64
          const decoded = atob(arg);
          addLines([
            { text: '[+] Initializing decryption core...', type: 'system' },
            { text: '[+] Match found in Base64 tables.', type: 'system' },
            { text: `[+] Decrypted Value: "${decoded}"`, type: 'success' },
          ], 150);
        } catch {
          // If not base64, run simulated decrypt sequence
          addLines([
            { text: '[+] Initializing brute force decrypt sequence...', type: 'system' },
            { text: '  [**] Cracking dictionary databases...', type: 'warning' },
            { text: '  [***] Cryptographic salt matching...', type: 'warning' },
            { text: `[+] Decryption Successful: "${arg.split('').reverse().join('')}" (Simulated reverse crack)`, type: 'success' },
          ], 150);
        }
        break;

      case 'scan':
        if (!arg) {
          setHistory((prev) => [...prev, { text: 'Error: Target required. Usage: scan <domain/IP>', type: 'error' }]);
          break;
        }
        addLines([
          { text: `[+] Initiating threat scan for "${arg}"...`, type: 'warning' },
          { text: '  [1/4] Querying DNS resolver records...', type: 'system' },
          { text: '  [2/4] Testing SSL/TLS certificate chains (TLS 1.3 Active)...', type: 'system' },
          { text: '  [3/4] Pulling reputation index from threat databases...', type: 'system' },
          { text: '  [4/4] Conducting simulated vulnerability audit...', type: 'system' },
          { text: `[+] Audit Complete: ${arg} resolved successfully.`, type: 'system' },
          { text: '  - Vulnerability Score: 0/100 (Safe)', type: 'success' },
          { text: '  - SSL Certificate: VALID (Issued by Let\'s Encrypt)', type: 'success' },
          { text: '  - Threat Classification: CLEAN / TRUSTWORTHY', type: 'success' },
          { text: `[+] Secure connection verified. Scan completed.`, type: 'success' },
        ], 140);
        break;

      default:
        setHistory((prev) => [
          ...prev,
          { text: `Command "${command}" not found. Type "help" to list available commands.`, type: 'error' },
        ]);
        break;
    }
  };

  const getLineColor = (type: LogLine['type']) => {
    switch (type) {
      case 'input':
        return 'text-emerald-400 font-bold';
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-amber-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-slate-300';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border border-border bg-[#030712] shadow-2xl rounded-2xl overflow-hidden font-mono text-sm leading-relaxed">
      {/* Top Header bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#111827] border-b border-border/80">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="h-4 w-4 text-primary" />
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">tilak-dev-shell.sh</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
      </div>

      <CardContent 
        className="h-[400px] overflow-y-auto p-4 space-y-2 select-text bg-[#030712] border-none custom-scrollbar" 
        onClick={focusTerminal}
      >
        {history.map((line, idx) => (
          <div key={idx} className={getLineColor(line.type)}>
            {line.text}
          </div>
        ))}
        {isProcessing && (
          <div className="text-primary animate-pulse flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
            Executing task...
          </div>
        )}
        <div ref={terminalEndRef} />
      </CardContent>

      <div className="px-4 py-3 bg-[#080d1a] border-t border-border/80">
        <form onSubmit={handleCommand} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4 text-primary shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isProcessing}
            placeholder="Type 'help' or commands here..."
            className="flex-grow bg-transparent text-emerald-400 outline-none border-none placeholder-slate-600 focus:ring-0 focus:outline-none focus:border-none p-0 text-sm h-8"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          <button 
            type="submit" 
            disabled={isProcessing}
            className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/20 transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
            title="Execute Command"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
          </button>
        </form>
      </div>
    </Card>
  );
}
