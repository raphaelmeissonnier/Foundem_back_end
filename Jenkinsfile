pipeline {
    agent any
    triggers 
    {
        githubPush()
    }
    stages {
        stage('Build') {
            steps {
                bat """ cd C:\Windows\System32\config\systemprofile\AppData\Local\Jenkins\.jenkins\workspace\perdupn_back_end\perdupn_back_end """
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
