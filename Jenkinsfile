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
                    nodejs(nodeJSInstallationName: 'node')
                    {
                        sh 'npm install'
                    }
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
