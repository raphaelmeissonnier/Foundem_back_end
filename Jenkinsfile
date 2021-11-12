pipeline {
    agent any
    triggers 
    {
        githubPush()
    }
 
    tools {nodejs "node"}
    stages {
        stage('Build') {
            steps {
                dir('perdupn_back_end')
                {
                    sh 'touch toto.txt'
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
