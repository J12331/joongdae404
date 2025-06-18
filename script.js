// ▶ 아래 URL을 정확히 여러분의 웹앱 exec URL로 바꿔주세요 ←
const GAS_URL = 'https://script.google.com/macros/s/AKfycbySI0FBLkyjJ5womXR2udT5B4LFsI08DMIru0Pl-OhdjBPXU1V8RRauHL7ajrejKvZXNA/exec';

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
  // 이전 JSONP 스크립트 태그가 있으면 제거
  const prev = document.getElementById('jsonpScript');
  if (prev) document.body.removeChild(prev);

  // 글로벌 콜백 함수 정의
  window[callbackName] = function(data) {
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

  // JSONP용 <script> 태그 생성 + 절대 URL 사용
  const script = document.createElement('script');
  script.id  = 'jsonpScript';
  script.src = `${GAS_URL}`
             + `?callback=${callbackName}`
             + `&name=${name}`
             + `&birth=${birth}`
             + `&phone=${phone}`;
  document.body.appendChild(script);
}
