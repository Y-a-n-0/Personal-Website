document.getElementById('copyLink').addEventListener('click', function(e) {
  e.preventDefault(); // 阻止默认链接行为
  
  // 要复制的文本内容
  const textToCopy = "2096197180";
  
  // 使用现代 Clipboard API
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      // 复制成功提示
      alert('联系方式已复制到剪贴板: ' + textToCopy);
      
      // 更美观的替代方案（使用SweetAlert等库）
      // Swal.fire('已复制!', '联系方式已保存到剪贴板', 'success');
    })
    .catch(err => {
      // 备用方案，适用于旧浏览器
      console.error('现代API失败，使用备用方案:', err);
      fallbackCopyText(textToCopy);
    });
});

// 兼容旧浏览器的备用方案
function fallbackCopyText(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed'; // 防止页面滚动
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    const successful = document.execCommand('copy');
    if(successful) {
      alert('联系方式已复制: ' + text);
    } else {
      alert('复制失败，请手动选择文本复制');
    }
  } catch (err) {
    alert('复制操作不被支持，请手动复制');
  }
  
  document.body.removeChild(textarea);
}