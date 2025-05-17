# AI Coding Agent

An intelligent coding agent that can:
- Accept natural language prompts/tasks
- Generate working code solutions
- Learn and improve from interactions
- Store knowledge for future use

## Features

1. **Natural Language Understanding**
   - Accepts plain English coding tasks
   - Analyzes requirements intelligently

2. **Code Generation**
   - Generates complete, working code
   - Includes necessary imports and dependencies
   - Handles multiple programming languages

3. **Self-Improvement**
   - Learns from each interaction
   - Builds a knowledge base
   - Expands capabilities over time

4. **Persistent Learning**
   - Stores successful solutions
   - Maintains a capability index
   - Saves interaction history

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
4. Create a `generated` directory:
   ```bash
   mkdir generated
   ```

## Usage

Start the agent:
```bash
npm start
```

Enter your coding tasks when prompted. For example:
- "Create a React component for a login form"
- "Generate an Express API endpoint for user authentication"
- "Write a function to sort an array of objects by date"

Type 'exit' to quit the program.

## How It Works

1. **Task Analysis**
   - The agent analyzes your prompt using GPT-4
   - Breaks down requirements into specific tasks

2. **Code Generation**
   - Generates appropriate code based on analysis
   - Includes necessary imports and setup

3. **Learning**
   - Stores successful solutions in knowledge base
   - Updates capabilities based on completed tasks
   - Improves responses over time

4. **Deployment**
   - Saves generated code to files
   - Maintains a history of generated solutions

## Extending the Agent

The agent can be extended by:
1. Adding new capability keywords
2. Implementing custom code deployment logic
3. Enhancing the learning mechanism
4. Adding code validation and testing

## Contributing

Feel free to submit issues and enhancement requests! 