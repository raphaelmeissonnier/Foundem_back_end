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
                    sh 'npm install'
                    sh 'npm install jest'
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
