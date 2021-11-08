pipeline {
    agent any
    triggers 
    {
        githubPush()
    }
    stages {
        stage('Build') {
            dir('perdupn_back_end'){}
            steps {
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
