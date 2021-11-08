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
                    echo 'on est dans sous folder'
                }
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
