function lookup() {
  const name  = encodeURIComponent(document.getElementById("name").value.trim());
  const birth = encodeURIComponent(document.getElementById("birth").value.trim());
  const phone = encodeURIComponent(document.getElementById("phone").value.trim());

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "조회 중입니다...";

  // GET 요청: preflight 없이 바로 호출
  const url = "https://script.google.com/macros/s/AKfycbySI0FBLkyjJ5womXR2udT5B4LFsI08DMIru0Pl-OhdjBPXU1V8RRauHL7ajrejKvZXNA/exec"
            + `?name=${name}&birth=${birth}&phone=${phone}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.length) {
        resultDiv.innerHTML = "<p>해당 학생 정보를 찾을 수 없습니다.</p>";
      } else {
        let html = "<table><tr><th>이름</th><th>과목</th><th>단원명</th><th>점수</th></tr>";
        data.forEach(item => {
          html += `<tr>
                     <td>${item.이름}</td>
                     <td>${item.과목}</td>
                     <td>${item.단원명}</td>
                     <td>${item.점수}</td>
                   </tr>`;
        });
        html += "</table>";
        resultDiv.innerHTML = html;
      }
    })
    .catch(err => {
      resultDiv.innerHTML = `<p>에러 발생: ${err}</p>`;
    });
}

