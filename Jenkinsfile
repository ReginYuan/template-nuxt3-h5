pipeline {
    agent {
        label 'jnlp-slave'
    }

    //设置环境变量
    environment {
        PROJECT_NAME="jnhgcloud-info"
        url="http://gitlab.jnhgsz.com/gitlab/zshb/web/jnhgcloud-info.git"
    }
    options {
        timestamps()
    }
    //设置参数
	parameters {string(name: 'Replicas', defaultValue: "1", description: '副本数量' )
				string(name: 'NameSpace', defaultValue: "zshb-${BRANCH_NAME}", description: '命名空间' )
	}

    stages {
        stage('Git Clone') {
            steps {
                checkout([$class: 'GitSCM', 
                branches: [[name: "*/${BRANCH_NAME}"]], 
                extensions: [], 
                userRemoteConfigs: [[credentialsId: 'gitlab-admin-user', 
                url: "${url}"]]])
            }
        }
        stage('Build-Package') {
            steps {
                sh '''
                npm cache clean -f
                pnpm install
                pnpm run build
                '''
            }
        }
		stage('Docker Build') {
            steps {
                sh '''
                docker build -t ${harborAddress}/${BRANCH_NAME}/${PROJECT_NAME}:${BUILD_ID} ./
                '''
            }
        }
		stage('Docker Push') {
            steps {
                sh '''
                docker login -u ${harborUser} -p ${harborPassword} ${harborAddress}
                docker push ${harborAddress}/${BRANCH_NAME}/${PROJECT_NAME}:${BUILD_ID}
                '''
            }
        }
		stage('Sed Deployment') {
            steps {
                sh """
                sed -i -e "s/PROJECT_NAME/${PROJECT_NAME}/g" \
                -e "s/NameSpace/${NameSpace}/g" \
                -e "s/Replicas/${Replicas}/g" \
                -e "s/BUILD_ID/${BUILD_ID}/g" \
                -e "s/BRANCH_NAME/${BRANCH_NAME}/g" \
                -e "s/harborAddress/${harborAddress}/g" ./Deployment.yml
                """
            }
        }

        stage('Kubectl Apply') {
            steps {
                sh 'kubectl apply -f  ./Deployment.yml'
            }
        }
    }
	post {
        always { 
            script {
                wrap([$class: 'BuildUser']) {
                    BUILD_USER = "${env.BUILD_USER}"
                }
                currentBuild.description = "构建人：${BUILD_USER} \n 分支: ${BRANCH_NAME} \n url: ${url}"
            }
        }
		success {
			dingtalk(
				robot: 'jenkins-id',
				type: 'MARKDOWN',
				title: "success: ${JOB_NAME}",
				text: [
                    "- 😄👍 构建成功 👍� \n",
                    "- 项目：${PROJECT_NAME} \n",
                    "- 构建ID: ${BUILD_ID} \n",
                    "- 发布持续时间: ${currentBuild.durationString} \n",
                    "- 分支: ${BRANCH_NAME}"
                ]
			)
		}
		failure {
			dingtalk(
				robot: 'jenkins-id',
				type: 'MARKDOWN',
				title: "success: ${JOB_NAME}",
				text: [
                    "- 😖❌ 构建失败 ❌� \n",
                    "- 项目：${PROJECT_NAME} \n",
                    "- 构建ID: ${BUILD_ID} \n",
                    "- 发布持续时间: ${currentBuild.durationString} \n",
                    "- 分支: ${BRANCH_NAME}"
                ]
			)
		}
	}
}
