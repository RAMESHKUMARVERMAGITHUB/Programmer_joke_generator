pipeline {
    agent any
    // tools {
    //     jdk 'jdk17'
    //     nodejs 'node16'
    // }
    environment {
        SCANNER_HOME = tool 'sonar-scanner'
    }
    stages {
        stage('clean workspace') {
            steps {
                cleanWs()
            }
        }
        stage('Checkout from Git') {
            steps {
                git branch: 'main', url: 'https://github.com/RAMESHKUMARVERMAGITHUB/Programmer_joke_generator.git'
            }
        }
        stage("Sonarqube Analysis") {
            steps {
                withSonarQubeEnv('sonar-server') {
                    sh '''$SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=programmer_joke_generator \
                    -Dsonar.projectKey=programmer_joke_generator'''
                }
            }
        }
        stage("Quality Gate") {
            steps {
                script {
                    waitForQualityGate abortPipeline: false, credentialsId: 'sonar'
                }
            }
        }
        // stage('Install Dependencies') {
        //     steps {
        //         sh "npm install"
        //     }
        // }
        stage('TRIVY FS SCAN') {
             steps {
                 sh "trivy fs . > trivyfs.txt"
             }
        }
        stage("Docker Build & Push"){
             steps{
                 script{
                   withDockerRegistry(credentialsId: 'docker', toolName: 'docker'){   
                      sh "docker build -t programmer_joke_generator ."
                      sh "docker tag programmer_joke_generator rameshkumarverma/programmer_joke_generator:latest "
                      sh "docker push rameshkumarverma/programmer_joke_generator:latest "
                    }
                }
            }
        }
        stage("TRIVY Image Scan"){
            steps{
                sh "trivy image rameshkumarverma/programmer_joke_generator:latest > trivyimage.txt" 
            }
        }
        stage("deploy_docker"){
            steps{
                sh "docker run -d --name programmer_joke_generator -p 80:80 rameshkumarverma/programmer_joke_generator"
            }
        }
        // stage('Deploy to Kubernets'){
        //     steps{
        //         script{
        //             // dir('kubernetes') {
        //                 withKubeConfig(caCertificate: '', clusterName: '', contextName: '', credentialsId: 'k8s', namespace: '', restrictKubeConfigAccess: false, serverUrl: '') {
        //                 sh 'kubectl delete --all pods'
        //                 sh 'kubectl apply -f deployment.yml'
        //                 sh 'kubectl apply -f service.yml'
        //                 }   
        //             // }
        //         }
        //     }
        // }
    }
    // post {
    //  always {
    //     emailext attachLog: true,
    //         subject: "'${currentBuild.result}'",
    //         body: "Project: ${env.JOB_NAME}<br/>" +
    //             "Build Number: ${env.BUILD_NUMBER}<br/>" +
    //             "URL: ${env.BUILD_URL}<br/>",
    //         to: 'rootmeet@gmail.com',                              
    //         attachmentsPattern: 'trivyfs.txt,trivyimage.txt'
    //     }
    // }
}
