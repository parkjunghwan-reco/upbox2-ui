# GitHub Pages 배포 설정

## 1. GitHub Repository 설정

### Repository Settings
1. GitHub 저장소의 **Settings** 탭으로 이동
2. 왼쪽 메뉴에서 **Pages** 클릭
3. **Source**를 **GitHub Actions**로 선택

### 환경 변수 설정 (선택사항)
만약 특정 환경변수가 필요하다면:
1. **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** 클릭하여 환경변수 추가

## 2. 배포 과정

### 자동 배포
- `main` 브랜치에 푸시될 때마다 자동으로 배포됩니다
- 수동으로 배포하려면 **Actions** 탭에서 **Deploy to GitHub Pages** 워크플로우를 실행하세요

### 배포 구조
```
https://your-username.github.io/upbox2-ui/
├── index.html                 # 메인 랜딩 페이지
├── storybook/                 # Storybook 문서
│   └── index.html
└── example/                   # 예제 앱
    └── index.html
```

## 3. 배포 URL 업데이트

README.md 파일에서 다음 URL들을 실제 GitHub 사용자명으로 변경하세요:

```markdown
- **Main Page**: https://your-username.github.io/upbox2-ui/
- **Storybook**: https://your-username.github.io/upbox2-ui/storybook/
- **Example App**: https://your-username.github.io/upbox2-ui/example/
```

## 4. 빌드 에러 해결

### 일반적인 문제들:

#### 1. **package-lock.json 문제**
```bash
# 에러: npm ci 실행 시 package-lock.json이 없음
npm error The `npm ci` command can only install with an existing package-lock.json
```

**해결방법**:
- GitHub Actions에서 `npm ci` 대신 `npm install` 사용
- 또는 로컬에서 각 패키지별로 package-lock.json 생성:
```bash
# 각 패키지 디렉토리에서 실행
cd packages/core && npm install
cd ../vue && npm install
cd ../tailwind && npm install
cd ../storybook && npm install
cd ../example && npm install
```

#### 2. **의존성 문제**
- 모든 패키지가 올바르게 빌드되는지 확인
- 패키지 간 의존 관계 순서 확인 (core → tailwind → vue → storybook/example)

#### 3. **경로 문제**
- 상대 경로 및 base URL 설정 확인
- GitHub Pages 서브디렉토리 경로 설정

#### 4. **타입 에러**
- TypeScript 컴파일 에러 해결
- 필요한 경우 빌드에서 타입 체크 제외

### 로컬 테스트:
```bash
# 간단한 로컬 빌드 테스트
./build-test.sh

# 또는 수동으로 단계별 테스트
# 전체 빌드 테스트
npm run build

# Storybook 빌드 테스트
cd packages/storybook
npm run build-storybook

# 예제 앱 빌드 테스트
cd packages/example
npm run build

# 로컬 서버에서 테스트
npx serve dist
```

### 빌드 스크립트 사용:
로컬에서 GitHub Actions와 동일한 환경을 테스트하려면:
```bash
# 빌드 테스트 스크립트 실행
./build-test.sh

# 빌드 완료 후 로컬 서버 실행
npx serve dist
```

## 5. 커스텀 도메인 (선택사항)

커스텀 도메인을 사용하려면:
1. `dist` 디렉토리에 `CNAME` 파일 추가
2. 도메인 DNS 설정에서 GitHub Pages IP 주소 추가

## 6. 모니터링

- **Actions** 탭에서 배포 상태 확인
- **Pages** 설정에서 배포 URL 확인
- 배포 완료 후 실제 사이트에서 동작 확인
