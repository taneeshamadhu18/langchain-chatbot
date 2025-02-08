import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_community.document_loaders import WebBaseLoader
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
import traceback


os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
os.environ["USER_AGENT"] = "LangChainApp/1.0"

loader = WebBaseLoader("https://brainlox.com/courses/category/technical")
documents = loader.load()

if not documents:
    raise ValueError("No documents found. Check the URL or website content.")


embeddings = OpenAIEmbeddings()


vector_db = Chroma.from_documents(documents, embeddings)

retriever = vector_db.as_retriever()


llm = ChatOpenAI()

qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 

@app.route('/query', methods=['POST'])
def query_chatbot():
    data = request.json
    query = data.get('query', '')

    if not query:
        return jsonify({'error': 'Query is required'}), 400

    try:
        response = qa_chain.invoke({"query": query}) 
        return jsonify({'response': response.get('result', 'No response generated.')})
    except Exception as e:
        traceback.print_exc() 
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
