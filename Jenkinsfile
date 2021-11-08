pipeline {
    agent any
    triggers 
    {
        githubPush()
    }
    stages {
        stage('Build') {
            steps {
                bat """ cd perdupn_back_end """
                bat 'npm install'
            }
        }
        stage('Test')
        {
            steps
            {
               bat 'npm test'
               bat 'npm run coveralls'
            }
        }
    }
}
