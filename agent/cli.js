#!/usr/bin/env node
require('dotenv').config();
const readline = require('readline');
const CodingAgent = require('./index');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const agent = new CodingAgent();

async function startCLI() {
    console.log('Coding Agent CLI - Type your coding task or "exit" to quit');
    console.log('Loading knowledge base...');
    
    await agent.loadKnowledgeBase();
    
    console.log('Ready to accept tasks!');
    askQuestion();
}

function askQuestion() {
    rl.question('\nEnter your task: ', async (prompt) => {
        if (prompt.toLowerCase() === 'exit') {
            rl.close();
            return;
        }

        console.log('\nProcessing your request...');
        
        try {
            const result = await agent.processTask(prompt);
            
            if (result.success) {
                console.log('\nTask Analysis:', result.analysis);
                console.log('\nGenerated Code:', result.code);
                console.log('\nCode has been saved to the generated/ directory');
            } else {
                console.error('\nError:', result.error);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }

        askQuestion();
    });
}

startCLI();

rl.on('close', () => {
    console.log('\nThank you for using the Coding Agent!');
    process.exit(0);
}); 