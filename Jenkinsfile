pipeline {
    agent any
    triggers 
    {
        githubPush()
    }
    dir('perdupn_back_end'){}
    stages {
        stage('Build') {
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
