pipeline {
    agent any
    triggers 
    {
        githubPush()
    }
    stages {
        stage('Build') {
            steps {
                dir('perdupn_back_end')
                {
                    bat 'npm install'
                }
            }
        }
        stage('Test')
        {
            steps
            {
               dir('perdupn_back_end')
               {
                   bat 'npm test'
               }
            }
        }
    }
}