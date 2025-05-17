const fs = require('fs').promises;
const path = require('path');
const { OpenAI } = require('openai');

class CodingAgent {
    constructor() {
        this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        this.knowledgeBase = new Map();
        this.capabilities = new Set();
        this.history = [];
    }

    async processTask(prompt) {
        try {
            // 1. Analyze the prompt
            const analysis = await this.analyzePrompt(prompt);

            // 2. Generate code based on analysis
            const generatedCode = await this.generateCode(analysis);

            // 3. Deploy or save the code
            await this.deployCode(generatedCode);

            // 4. Learn from this interaction
            await this.learn(prompt, analysis, generatedCode);

            return {
                success: true,
                code: generatedCode,
                analysis: analysis
            };
        } catch (error) {
            console.error('Error processing task:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async analyzePrompt(prompt) {
        const completion = await this.openai.chat.completions.create({
            model: "gpt-4",
            messages: [{
                role: "system",
                content: "You are a coding assistant. Analyze the following task and break it down into specific requirements."
            }, {
                role: "user",
                content: prompt
            }]
        });

        return completion.choices[0].message.content;
    }

    async generateCode(analysis) {
        const completion = await this.openai.chat.completions.create({
            model: "gpt-4",
            messages: [{
                role: "system",
                content: "Generate code based on the following analysis. Include necessary imports and complete implementation."
            }, {
                role: "user",
                content: analysis
            }]
        });

        return completion.choices[0].message.content;
    }

    async deployCode(code) {
        // This is where you'd implement code deployment logic
        // For now, we'll just save it to a file
        const timestamp = Date.now();
        const filename = `generated_code_${timestamp}.js`;
        await fs.writeFile(path.join(__dirname, 'generated', filename), code);
    }

    async learn(prompt, analysis, code) {
        // Store the interaction in history
        this.history.push({
            timestamp: Date.now(),
            prompt,
            analysis,
            code
        });

        // Update capabilities based on the task
        this.updateCapabilities(analysis);

        // Save learning to knowledge base
        await this.updateKnowledgeBase(prompt, code);
    }

    async updateKnowledgeBase(prompt, solution) {
        // Store successful solutions for future reference
        this.knowledgeBase.set(prompt, {
            solution,
            timestamp: Date.now()
        });

        // Save knowledge base to file
        await fs.writeFile(
            path.join(__dirname, 'knowledge_base.json'),
            JSON.stringify(Array.from(this.knowledgeBase.entries()), null, 2)
        );
    }

    updateCapabilities(analysis) {
        // Extract and add new capabilities based on the task
        const newCapabilities = this.extractCapabilities(analysis);
        newCapabilities.forEach(cap => this.capabilities.add(cap));
    }

    extractCapabilities(analysis) {
        // Simple capability extraction (can be made more sophisticated)
        const keywords = ['react', 'node', 'express', 'database', 'api'];
        return keywords.filter(keyword => 
            analysis.toLowerCase().includes(keyword)
        );
    }

    async loadKnowledgeBase() {
        try {
            const data = await fs.readFile(
                path.join(__dirname, 'knowledge_base.json'),
                'utf8'
            );
            this.knowledgeBase = new Map(JSON.parse(data));
        } catch (error) {
            console.log('No existing knowledge base found, starting fresh');
        }
    }
}

module.exports = CodingAgent; 