// ▶ 방금 복사한 웹앱 URL(…/exec)로 교체하세요
const GAS_URL = 'https://script.google.com/macros/s/AKfycbzqhtxeV7UDxllwW7EAhczVmEi0UdAEj7jbity2YX5QnCwEuxPROEFIfKtX0wjarEc-aA/exec';

function lookup() {
  const name  = encodeURIComponent(document.getElementById('name').value.trim());
  const birth = encodeURIComponent(document.getElementById('birth').value.trim());
  const phone = encodeURIComponent(document.getElementById('phone').value.trim());
  const resultDiv = document.getElementById('result');

  if (!name || !birth || !phone) {
    resultDiv.innerHTML = '<p>모든 필드를 입력해주세요.</p>';
    return;
  }
  resultDiv.innerHTML = '<p>조회 중입니다...</p>';

  const callbackName = 'handleGradesCallback';
  // 이전 JSONP 스크립트 태그 제거
  const prev = document.getElementById('jsonpScript');
  if (prev) document.body.removeChild(prev);

  // 글로벌 콜백 함수 정의 (여기에서 console.log)
  window[callbackName] = function(data) {
    console.log('JSONP 응답 데이터:', data);  // ← 이 로그가 찍히는지 확인!
    delete window[callbackName];
    const tag = document.getElementById('jsonpScript');
    if (tag) document.body.removeChild(tag);

    if (!data.length) {
      resultDiv.innerHTML = '<p>해당 학생 정보를 찾을 수 없습니다.</p>';
    } else {
      let html = '<table><tr><th>이름</th><th>과목</th><th>단원명</th><th>점수</th></tr>';
      data.forEach(item => {
        html += `<tr>
                   <td>${item.이름}</td>
                   <td>${item.과목}</td>
                   <td>${item.단원명}</td>
                   <td>${item.점수}</td>
                 </tr>`;
      });
      html += '</table>';
      resultDiv.innerHTML = html;
    }
  };

  // JSONP 호출용 <script> 태그 생성
  const script = document.createElement('script');
  script.id  = 'jsonpScript';
  script.src = `${GAS_URL}`
             + `?callback=${callbackName}`
             + `&name=${name}`
             + `&birth=${birth}`
             + `&phone=${phone}`;
  document.body.appendChild(script);
}
