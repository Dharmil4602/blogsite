# Blogsite

Welcome to the Blogsite project! This repository contains the implementation of a scalable blog platform using modern web technologies and various AWS services.

## Project Description

This project showcases the development of a blog platform with both frontend and backend components. It uses React for the frontend, Node.js and Express.js for the backend, and integrates with several AWS services to ensure high availability, efficient data storage, security, and performance optimization.

## Features

- **Frontend**: Developed using React to create a responsive and interactive user interface.
- **Backend**: Implemented with Node.js and Express.js, including user authentication and API development.
- **AWS Services**:
  - **SNS (Simple Notification Service)**: For notifications.
  - **EC2 (Elastic Compute Cloud)**: For high availability and scalable compute resources.
  - **DynamoDB**: For efficient and scalable data storage.
  - **S3 (Simple Storage Service)**: For static asset storage.
  - **CloudFront**: For content delivery and caching.
  - **Elastic Beanstalk (EBS)**: For simplified deployment and management.
  - **Secrets Manager**: For managing sensitive information and ensuring data confidentiality.
  - **CloudFormation**: For resource provisioning and management using Infrastructure as Code (IaC).

## Technologies Used

- **Frontend**: React, CSS
- **Backend**: Node.js, Express.js
- **AWS Services**:
  - SNS
  - EC2
  - DynamoDB
  - S3
  - CloudFront
  - Elastic Beanstalk
  - Secrets Manager
  - CloudFormation

## Architecture

The architecture of this project involves the following components:

1. **Frontend**: Built with React, providing a dynamic and responsive user interface.
2. **Backend**: Developed using Node.js and Express.js, handling API requests and user authentication.
3. **AWS Integration**:
   - **SNS**: Manages notifications.
   - **EC2**: Hosts the backend server.
   - **DynamoDB**: Stores user data and blog posts.
   - **S3**: Stores static assets like images and CSS files.
   - **CloudFront**: Delivers content efficiently with low latency.
   - **Elastic Beanstalk**: Manages deployment and scaling of the backend server.
   - **Secrets Manager**: Stores and retrieves sensitive configuration data.
   - **CloudFormation**: Automates the setup of AWS resources.

## Setup and Deployment

Follow these steps to set up and deploy the project:

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/Dharmil4602/blogsite.git
    cd blogsite
    ```

2. **Install Dependencies**:
    ```sh
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. **Configure AWS Services**:
    - Set up your AWS credentials and ensure you have the necessary permissions.

4. **Run Frontend Locally**:
    ```sh
    cd frontend
    npm start
    ```

## Usage

After deploying the backend to AWS Elastic Beanstalk and running the frontend locally, you can access the application through the specified URL. The application allows users to create and manage blog posts, and supports user authentication.

---
