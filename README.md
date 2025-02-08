# 🚀 LangChain Chatbot

A custom chatbot powered by **LangChain**, **OpenAI**, and **ChromaDB** for handling technical course queries from [Brainlox](https://brainlox.com/courses/category/technical).

## 🌟 Features

- ✅ Extracts data from technical courses using LangChain URL loaders
- ✅ Creates embeddings and stores them in Chroma vector database
- ✅ RESTful API built with Flask to handle queries
- ✅ CORS-enabled for smooth frontend-backend communication

## 📦 Installation

### 1. **Clone the Repository**

```bash
git clone https://github.com/taneeshamadhu18/langchain-chatbot.git
cd langchain-chatbot
```

### 2. **Create a Virtual Environment (Optional but Recommended)**

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. **Install Dependencies**

```bash
pip install -r requirements.txt
```

### 4. **Set Environment Variables**

Create a `.env` file in the project root and add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key
```

## 🚀 Running the API

```bash
python app.py
```

The API will run at `http://localhost:5000`.

## 📩 API Usage

### **Endpoint:** `/query`

- **Method:** `POST`

- **Request Headers:**

  - `Content-Type: application/json`

- **Request Body:**

  ```json
  {
    "query": "What are the available technical courses?"
  }
  ```

- **Response Example:**

  ```json
  {
    "response": "Here are the available technical courses on Brainlox..."
  }
  ```

### **Example cURL Request:**

```bash
curl -X POST http://localhost:5000/query \
     -H "Content-Type: application/json" \
     -d '{"query": "List all technical courses."}'
```

## 📋 Technologies Used

- **Python** 🐍
- **Flask** 🌐
- **LangChain** 🤖
- **OpenAI GPT** 🧠
- **ChromaDB** 📊
- **CORS** 🔗

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

## ⚠️ Troubleshooting

- Ensure your OpenAI API key is valid.
- Check if the website URL for document extraction is accessible.
- Verify all dependencies are correctly installed.

## 📄 License

This project is licensed under the MIT License.

---

*Crafted with ❤️ using LangChain and OpenAI*

