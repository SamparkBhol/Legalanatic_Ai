import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UploadCloud, FileText, BrainCircuit, ShieldCheck, MessageSquare, AlertTriangle, Info, CheckCircle2, Loader2, Zap, History, FilePieChart, Bot, FileJson } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import useLocalStorage from '@/hooks/useLocalStorage';

const DashboardPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useLocalStorage('legalmind-fileName', '');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useLocalStorage('legalmind-analysisResult', null);
  const [analysisHistory, setAnalysisHistory] = useLocalStorage('legalmind-analysisHistory', []);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [askContractMessages, setAskContractMessages] = useLocalStorage('legalmind-askContractMessages', []);
  const [askContractInput, setAskContractInput] = useState('');

  const [complianceBotMessages, setComplianceBotMessages] = useLocalStorage('legalmind-complianceBotMessages', []);
  const [complianceBotInput, setComplianceBotInput] = useState('');

  const { toast } = useToast();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "application/pdf" || file.name.endsWith('.pdf')) {
        setSelectedFile(file);
        setFileName(file.name);
        setAnalysisResult(null);
        setAskContractMessages([]); 
        toast({ title: "File Selected", description: `${file.name} is ready for upload.`, variant: "success" });
      } else {
        toast({ title: "Invalid File Type", description: "Please select a PDF file.", variant: "destructive" });
        setSelectedFile(null);
        setFileName('');
      }
    }
  };

  const handleUploadAndAnalyze = () => {
    if (!selectedFile && !fileName) {
      toast({ title: "No File Selected", description: "Please select a document to analyze.", variant: "destructive" });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        toast({ title: "Upload Complete!", description: `${selectedFile?.name || fileName} uploaded successfully.`, variant: "success" });
        handleAnalyze();
      }
    }, 200);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const currentDate = new Date().toLocaleString();
      const mockAnalysis = {
        id: Date.now(),
        fileName: selectedFile?.name || fileName,
        date: currentDate,
        summary: `This is a standard Non-Disclosure Agreement (NDA) analyzed on ${currentDate}. It outlines the confidential information to be shared and the obligations of the receiving party to protect this information. Key clauses include definition of confidential information, exclusions, obligations of receiving party, term of agreement, and return/destruction of information.`,
        clauses: [
          { id: 1, title: "Definition of Confidential Information", text: "Confidential Information shall mean all data and information of a confidential or proprietary nature...", risk: "low", simplification: "This part explains what counts as secret info.", issues: [] },
          { id: 2, title: "Obligations of Receiving Party", text: "The Receiving Party shall hold and maintain the Confidential Information in strictest confidence...", risk: "medium", simplification: "This says you must keep the info secret and use it only for the agreed purpose.", issues: [{severity: "warning", text: "Consider adding specific examples of protective measures, e.g., encryption for digital data."}] },
          { id: 3, title: "Term of Agreement", text: "This Agreement shall remain in effect for a period of five (5) years from the Effective Date.", risk: "low", simplification: "The agreement lasts for 5 years.", issues: [] },
          { id: 4, title: "Governing Law", text: "This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of laws principles.", risk: "high", simplification: "If there's a legal fight, Delaware laws will be used. This might be unfavorable depending on your location.", issues: [{severity: "critical", text: "Governing law in Delaware might not be ideal if your business primarily operates elsewhere. Consult legal counsel."}] },
          { id: 5, title: "Exclusions from Confidential Information", text: "Confidential Information does not include information that (a) is or becomes publicly known...", risk: "medium", simplification: "Info isn't secret if it's already public or you knew it before.", issues: [{severity: "warning", text: "Ensure the definition of 'publicly known' is not overly broad."}]}
        ],
        overallRisk: Math.floor(Math.random() * 50) + 40, 
        alerts: [
          { type: "warning", message: "The 'Dispute Resolution' clause seems standard but consider specifying arbitration rules for faster resolution." },
          { type: "critical", message: "No 'Indemnification' clause found. This could expose you to significant liability if the other party breaches." },
          { type: "info", message: "Consider adding a clause for 'Force Majeure' to cover unforeseeable circumstances."}
        ],
        langFlowVisualization: "Conceptual representation of a LangFlow pipeline: [Upload] -> [OCR] -> [Clause Splitter] -> [Risk Classifier] -> [Simplifier LLM] -> [Output Generation]",
      };
      setAnalysisResult(mockAnalysis);
      setAnalysisHistory(prevHistory => [mockAnalysis, ...prevHistory.slice(0, 9)]);
      setIsAnalyzing(false);
      toast({ title: "Analysis Complete!", description: `Your document "${mockAnalysis.fileName}" has been analyzed.`, variant: "success" });
    }, 3000);
  };
  
  const handleGenericChatMessageSend = (input, setMessages, botName, setInput) => {
    if (!input.trim()) return;
    const newMessages = [...(botName === 'askContract' ? askContractMessages : complianceBotMessages), { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    
    setTimeout(() => {
      let aiResponse = "";
      if (botName === 'askContract') {
        aiResponse = `Regarding your question about "${input.substring(0,20)}..." in the document: Based on the (mock) analysis, this is a pertinent query. A real AI would now search the document for relevant clauses and provide a specific answer.`;
      } else if (botName === 'complianceBot') {
        aiResponse = `Checking compliance for "${input.substring(0,20)}...": This is an important compliance aspect. A real AI would cross-reference this with relevant legal databases and regulations (e.g., GDPR, CCPA) to provide guidance.`;
      }
      setMessages([...newMessages, { sender: 'ai', text: aiResponse }]);
    }, 1500);
  };

  const getAlertIcon = (type) => {
    if (type === 'critical') return <AlertTriangle className="h-5 w-5 text-red-500" />;
    if (type === 'warning') return <Info className="h-5 w-5 text-yellow-500" />;
    return <CheckCircle2 className="h-5 w-5 text-blue-500" />; 
  };

  const loadAnalysisFromHistory = (historicalAnalysis) => {
    setFileName(historicalAnalysis.fileName);
    setAnalysisResult(historicalAnalysis);
    setSelectedFile(null); 
    toast({ title: "Loaded from History", description: `Displaying analysis for ${historicalAnalysis.fileName} from ${historicalAnalysis.date}.`, variant: "info" });
  };

  useEffect(() => {
    if (fileName && !analysisResult && localStorage.getItem('legalmind-analysisResult')) {
       const storedAnalysis = JSON.parse(localStorage.getItem('legalmind-analysisResult'));
       if (storedAnalysis && storedAnalysis.fileName === fileName) {
         setAnalysisResult(storedAnalysis);
       }
    }
  }, [fileName]);


  return (
    <TooltipProvider>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Card className="glassmorphic shadow-2xl shadow-primary/10">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text">
            <UploadCloud className="mr-3 h-8 w-8 text-primary" /> Document Upload & Analysis
          </CardTitle>
          <CardDescription>
            Upload your legal document (PDF format) to get an AI-powered analysis. Previously analyzed documents can be found in the 'Analysis History' tab.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid w-full max-w-md items-center gap-2">
            <Label htmlFor="document-upload" className="text-lg font-semibold">Upload New Document</Label>
            <Input id="document-upload" type="file" accept=".pdf" onChange={handleFileChange} className="text-base p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
          </div>
          {fileName && !isUploading && !isAnalyzing && (
            <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-sm text-green-400">
              Selected for new analysis: <span className="font-semibold">{fileName}</span>
            </motion.p>
          )}
          {(isUploading || isAnalyzing) && (
            <div className="space-y-2">
              <Progress value={isUploading ? uploadProgress : (isAnalyzing ? undefined : 0)} className="w-full h-3 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-accent" />
              <p className="text-sm text-muted-foreground flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-primary" />
                {isUploading ? `Uploading ${selectedFile?.name || fileName}... ${uploadProgress}%` : (isAnalyzing ? `Analyzing ${selectedFile?.name || fileName}... This may take a moment.` : '')}
              </p>
            </div>
          )}
          <Button onClick={handleUploadAndAnalyze} disabled={isUploading || isAnalyzing || (!selectedFile && !fileName)} size="lg" className="w-full md:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-primary-foreground shadow-lg shadow-primary/50">
            {(isUploading || isAnalyzing) ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-5 w-5" /> {selectedFile ? 'Upload & Analyze New' : (fileName && analysisResult ? 'Re-Analyze Current' : 'Analyze Selected')}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <AnimatePresence>
      {analysisResult && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
        <Card className="mt-8 glassmorphic shadow-2xl shadow-secondary/10">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center bg-gradient-to-r from-secondary via-accent to-primary text-transparent bg-clip-text">
              <FileText className="mr-3 h-8 w-8 text-secondary" /> Analysis for: {analysisResult.fileName}
            </CardTitle>
            <CardDescription>Analyzed on: {analysisResult.date}</CardDescription>
            <div className="flex items-center space-x-2 pt-2">
              <span className="text-sm text-muted-foreground">Overall Document Risk:</span>
              <Progress value={analysisResult.overallRisk} className="w-1/2 h-3 [&>div]:bg-gradient-to-r [&>div]:from-yellow-500 [&>div]:via-red-500 [&>div]:to-red-700" />
              <span className={`font-bold ${analysisResult.overallRisk > 70 ? 'text-red-500' : analysisResult.overallRisk > 40 ? 'text-yellow-500' : 'text-green-500'}`}>
                {analysisResult.overallRisk}%
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-7 mb-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="clauses">Clauses</TabsTrigger>
                <TabsTrigger value="alerts">Smart Alerts</TabsTrigger>
                <TabsTrigger value="askContract">Ask Contract</TabsTrigger>
                <TabsTrigger value="complianceBot">Compliance Bot</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="history">Analysis History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary">
                <Card className="bg-background/50">
                  <CardHeader><CardTitle className="text-xl">Document Summary</CardTitle></CardHeader>
                  <CardContent className="text-muted-foreground prose prose-invert max-w-none">
                    <p>{analysisResult.summary}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="clauses">
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                  {analysisResult.clauses.map(clause => (
                    <Card key={clause.id} className="bg-background/50 hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{clause.title}</CardTitle>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                                clause.risk === 'low' ? 'bg-green-500/20 text-green-400' :
                                clause.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                Risk: {clause.risk.toUpperCase()}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>This clause has been identified as {clause.risk} risk.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-sm text-primary mb-1">Simplified Explanation:</h4>
                          <p className="text-sm text-muted-foreground italic">"{clause.simplification}"</p>
                        </div>
                        {clause.issues.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-sm text-accent mb-1">Potential Issues:</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {clause.issues.map((issue, idx) => (
                                <li key={idx} className={`text-sm ${issue.severity === 'critical' ? 'text-red-400' : 'text-yellow-400'}`}>
                                  {issue.text}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="link" size="sm" className="p-0 h-auto text-secondary">View Original Clause Text</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{clause.title} - Original Text</DialogTitle>
                              <DialogDescription>
                                This is the original text of the clause as extracted from the document.
                              </DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="max-h-[400px] mt-4 p-4 border rounded-md bg-muted/30">
                              <pre className="text-sm text-foreground whitespace-pre-wrap">{clause.text}</pre>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>
                  ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="alerts">
                <div className="space-y-4">
                  {analysisResult.alerts.length > 0 ? analysisResult.alerts.map((alert, index) => (
                    <Alert key={index} variant={alert.type === 'critical' ? 'destructive' : (alert.type === 'warning' ? 'warning' : 'default')} className={`bg-background/50 ${alert.type === 'info' ? 'border-blue-500/50' : ''}`}>
                      {getAlertIcon(alert.type)}
                      <AlertTitle className={alert.type === 'critical' ? 'text-red-400' : (alert.type === 'warning' ? 'text-yellow-400' : 'text-blue-400')}>{alert.type.toUpperCase()} Alert</AlertTitle>
                      <AlertDescription className="text-muted-foreground">{alert.message}</AlertDescription>
                    </Alert>
                  )) : (
                    <Alert variant="success" className="bg-background/50">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <AlertTitle>All Clear!</AlertTitle>
                      <AlertDescription>No critical or warning alerts found for this document based on our standard checks.</AlertDescription>
                    </Alert>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="askContract">
                <Card className="bg-background/50">
                  <CardHeader><CardTitle className="text-xl flex items-center"><MessageSquare className="mr-2 text-primary"/> Ask Your Contract</CardTitle></CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] border rounded-md p-4 mb-4 space-y-3 bg-muted/20">
                      {askContractMessages.map((msg, index) => (
                        <motion.div 
                          key={index} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[70%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                            {msg.text}
                          </div>
                        </motion.div>
                      ))}
                      {askContractMessages.length === 0 && <p className="text-center text-muted-foreground">Ask questions about '{analysisResult.fileName}' here...</p>}
                    </ScrollArea>
                    <div className="flex space-x-2">
                      <Input 
                        type="text" 
                        placeholder="E.g., 'What is the term of this agreement?'" 
                        value={askContractInput}
                        onChange={(e) => setAskContractInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleGenericChatMessageSend(askContractInput, setAskContractMessages, 'askContract', setAskContractInput)}
                        className="flex-grow"
                      />
                      <Button onClick={() => handleGenericChatMessageSend(askContractInput, setAskContractMessages, 'askContract', setAskContractInput)} className="bg-gradient-to-r from-primary to-accent text-primary-foreground">Send</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="complianceBot">
                <Card className="bg-background/50">
                  <CardHeader><CardTitle className="text-xl flex items-center"><Bot className="mr-2 text-accent"/> Compliance Bot</CardTitle></CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] border rounded-md p-4 mb-4 space-y-3 bg-muted/20">
                      {complianceBotMessages.map((msg, index) => (
                        <motion.div 
                          key={index} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[70%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                            {msg.text}
                          </div>
                        </motion.div>
                      ))}
                      {complianceBotMessages.length === 0 && <p className="text-center text-muted-foreground">Ask compliance related questions (e.g., GDPR, CCPA)...</p>}
                    </ScrollArea>
                    <div className="flex space-x-2">
                      <Input 
                        type="text" 
                        placeholder="E.g., 'Is this document GDPR compliant?'" 
                        value={complianceBotInput}
                        onChange={(e) => setComplianceBotInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleGenericChatMessageSend(complianceBotInput, setComplianceBotMessages, 'complianceBot', setComplianceBotInput)}
                        className="flex-grow"
                      />
                      <Button onClick={() => handleGenericChatMessageSend(complianceBotInput, setComplianceBotMessages, 'complianceBot', setComplianceBotInput)} className="bg-gradient-to-r from-accent to-secondary text-accent-foreground">Ask Bot</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports">
                <Card className="bg-background/50">
                  <CardHeader><CardTitle className="text-xl flex items-center"><FilePieChart className="mr-2 text-primary"/> Generated Reports</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Downloadable reports based on the analysis of '{analysisResult.fileName}'. (Mock functionality)</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="w-full justify-start"><FileText className="mr-2 h-4 w-4"/> Download Full Analysis Report (PDF)</Button>
                      <Button variant="outline" className="w-full justify-start"><ShieldCheck className="mr-2 h-4 w-4"/> Download Risk Assessment Report (CSV)</Button>
                      <Button variant="outline" className="w-full justify-start"><FileJson className="mr-2 h-4 w-4"/> Export Analysis Data (JSON)</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card className="bg-background/50">
                  <CardHeader><CardTitle className="text-xl flex items-center"><History className="mr-2 text-secondary"/> Analysis History</CardTitle></CardHeader>
                  <CardContent>
                    {analysisHistory.length > 0 ? (
                      <ScrollArea className="h-[400px]">
                        <div className="space-y-3">
                          {analysisHistory.map(item => (
                            <Card key={item.id} className="p-4 hover:bg-muted/30 cursor-pointer transition-colors" onClick={() => loadAnalysisFromHistory(item)}>
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-semibold text-primary">{item.fileName}</p>
                                  <p className="text-xs text-muted-foreground">Analyzed: {item.date}</p>
                                </div>
                                <span className={`text-sm font-bold ${item.overallRisk > 70 ? 'text-red-500' : item.overallRisk > 40 ? 'text-yellow-500' : 'text-green-500'}`}>
                                  Risk: {item.overallRisk}%
                                </span>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">No analysis history found. Analyze a document to see it here.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

            </Tabs>
          </CardContent>
        </Card>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.div>
    </TooltipProvider>
  );
};

export default DashboardPage;