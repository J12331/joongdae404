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

  // 이전 JSONP 스크립트가 남아있다면 제거
  const old = document.getElementById('jsonpScript');
  if (old) document.body.removeChild(old);

  // 전역 콜백 함수 정의
  window[callbackName] = function(data) {
    // 콜백 수행 후 정리
    delete window[callbackName];
    const s = document.getElementById('jsonpScript');
    if (s) document.body.removeChild(s);

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

  // JSONP 호출용 스크립트 태그 생성
  const script = document.createElement('script');
  script.id  = 'jsonpScript';
  script.src = `${GAS_URL}`
             + `?callback=${callbackName}`
             + `&name=${name}`
             + `&birth=${birth}`
             + `&phone=${phone}`;
  document.body.appendChild(script);
}



