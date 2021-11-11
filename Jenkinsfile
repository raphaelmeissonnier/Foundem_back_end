pipeline {
    agent any
    triggers 
    {
        githubPush()
    }
 
    tools {NodeJS "node"}
    stages {
        stage('Build') {
            steps {
                dir('perdupn_back_end')
                {
                    sh 'npm install'
                }
            }
        }
        stage('Test')
        {
            steps
            {
               dir('perdupn_back_end')
               {
                   sh 'npm test'
               }
            }
        }
    }
}
