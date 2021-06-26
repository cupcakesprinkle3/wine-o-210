async function replyFormHandler(event) {
    event.preventDefault();
  
    const reply_text = document.querySelector('textarea[name="reply-body"]').value.trim();
  
    const wine_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (reply_text) {
        const response = await fetch('/api/replies', {
          method: 'POST',
          body: JSON.stringify({
            wine_id,
            reply_text
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      }
  }
  
  document.querySelector('.reply-form').addEventListener('submit', replyFormHandler);