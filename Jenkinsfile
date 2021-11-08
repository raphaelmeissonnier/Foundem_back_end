pipeline {
    agent any
    stages {
        stage('Trigger')
        {
            steps{
                triggers 
                {
                    githubPush()
                }
            }
        }
        stage('Build') {
            steps {
                bat 'cd perdupn_back_end'
                bat 'npm install'
            }
        }
        stage('Test')
        {
            steps
            {
               bat 'npm run coveralls'
            }
        }
    }
}
