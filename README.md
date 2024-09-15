# Credit Verification and Prequalification System

## Overview

The Credit Verification and Prequalification System is a comprehensive solution designed to streamline the credit application process for banks and financial institutions. This system utilizes advanced technologies to automate the verification of documents, perform risk assessments, and provide prequalification evaluations for credit applicants. By reducing the need for manual reviews, the system enhances the efficiency and accuracy of the credit approval process, allowing institutions to process more applications in less time with fewer errors.

## Key Features

- **Document Upload and Classification**: Users can upload required documents such as IDs, proof of income, and bank statements. The system provides options to classify each document type, ensuring accurate processing and analysis.

- **Automated Document Analysis**: Leveraging computer vision and OCR technology with Tesseract, the system extracts key information from uploaded documents. This includes validating the authenticity of documents and detecting any potential signs of fraud.

- **Risk Assessment and Prequalification**: The backend, powered by FastAPI and ChatGPT, analyzes the extracted data against predefined rules and criteria. The system evaluates the applicant's risk score and provides an initial prequalification status, helping analysts make informed decisions quickly.

- **Dashboard and Search Functionality**: A user-friendly dashboard allows analysts to manage and review applications efficiently. The dashboard includes search and filter functionalities, making it easy to find specific applications and focus on those requiring attention.

- **Notifications and Account Management**: The system includes notification features to keep users informed about the status of their applications. Account management features allow users to update their information and adjust notification preferences.

## Technologies Used

- **Frontend**: Built using modern JavaScript frameworks with a responsive design to ensure accessibility across devices. Components are designed with Tailwind CSS for a clean and consistent UI.
  
- **Backend**: Developed with FastAPI, providing a robust and scalable API for handling application logic and data processing. The backend integrates Tesseract for OCR tasks and utilizes ChatGPT for intelligent data evaluation and recommendations.

## Purpose

This project is aimed at enhancing the credit approval workflow for banks by reducing the time and resources needed for document verification and applicant assessment. By automating key parts of the process and providing a comprehensive review dashboard, the system helps financial institutions make faster, more accurate credit decisions, ultimately improving customer satisfaction and operational efficiency.

## Target Audience

The primary users of this system are banks, financial institutions, and credit unions looking to modernize their credit verification processes. It is tailored for use by credit analysts, loan officers, and other banking professionals involved in the credit approval pipeline.

---

By implementing this system, banks can leverage advanced AI and machine learning technologies to stay ahead of the competition, offering a seamless and efficient credit application experience to their clients.

## Installation

### Clone the repository
```bash
git clone https://github.com/fridaplatform-hackmty24/Ingeniebrios.git
```

### Backend Setup
#### Step 1: Create a Firebase project:
- In Firebase, under the Build section, enable Firestore and Storage.

#### Step 2: Obtain Firebase Credentials JSON (Private Key)
- Go to the Firebase Console.
- Navigate to Project Settings.
- Go to Service Accounts.
- Generate a new private key.
- Save the downloaded file in a `/config` folder inside the `/backend` directory.
```bash
mkdir /config
```

#### Step 3: Setup .env file
- Create a `.env` file in the `/backend` folder:
```bash
touch .env
```

- Add the following environment variables:
```bash
FIREBASE_CREDENTIALS_PATH=/path-to-private-key.json # Inside /config
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
DATABASE_URL=https://your-project-id.firebaseio.com/
PORT=8000
OPEN_API_KEY="sk-..."
```

#### Step 4: Install Requirements
- Create a virtual environment:
```bash
python -m venv venv
```

- Activate the virtual environment:
  - On Windows:
```bash
venv\Scripts\activate
```

  - On Mac/Linux:
```bash
source venv/bin/activate
```
- Install dependencies from `requirements.txt`
```bash
pip install -r requirements.txt
```

**EXTRA**: In some cases, you may need to install these two dependencies separately:
- For MacOS:
```bash
brew install pdf2image
brew install tesseract
```

- For Windows/Linux: Install pdf2image and tesseract through your preferred package manager or directly from their websites.

### Frontend Setup
#### Step 1: Navigate to the `/frontend`repository:
Go into the frontend folder where the React Vite project is located:
```bash
cd /frontend
```

#### Step 2: Install dependencies
Install the necessary packages using npm:
```bash
npm install
```


## Usage
### Starting the FastAPI server
- Navigate to the `/backend` directory:
```bash
cd /backend
```
- Run the FastAPI server:
```bash
uvicorn app.main:app --reload
```

### Starting the Vite App
- Navigate to the `/frontend` directory:
```bash
cd /frontend
```

- Run the vite app:
```bash
npm run dev
```