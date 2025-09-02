<script>
  (function(){
    const root = document.querySelector('.uc-accordion');
    if(!root) return;

    const allowMultiple = root.getAttribute('data-allow-multiple') === 'true';

    // Animación de altura en <details>
    root.querySelectorAll('.uc-item').forEach(dtl => {
      const body = dtl.querySelector('.uc-body');
      if(!body) return;

      dtl.addEventListener('toggle', () => {
        // Cerrar otros si no se permite múltiples
        if(dtl.open && !allowMultiple){
          root.querySelectorAll('.uc-item[open]').forEach(other => {
            if(other !== dtl) other.open = false;
          });
        }
        // Animar
        body.style.overflow = 'hidden';
        if(dtl.open){
          body.style.height = '0px';
          requestAnimationFrame(()=>{
            body.style.transition = 'height .22s ease';
            body.style.height = body.scrollHeight + 'px';
          });
          body.addEventListener('transitionend', () => {
            body.style.height = 'auto';
            body.style.overflow = '';
            body.style.transition = '';
          }, {once:true});
        }else{
          const h = body.scrollHeight;
          body.style.height = h + 'px';
          requestAnimationFrame(()=>{
            body.style.transition = 'height .22s ease';
            body.style.height = '0px';
          });
          body.addEventListener('transitionend', () => {
            body.style.overflow = '';
            body.style.transition = '';
          }, {once:true});
        }
      });
    });

    // Deep-link: #uc-ai abre el panel correspondiente
    if(location.hash && location.hash.startsWith('#uc-')){
      const target = document.querySelector(location.hash);
      if(target && target.classList.contains('uc-item')){
        target.open = true;
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }
	const detail = document.getElementById('uc-detail');
	if (detail) {
	  document.querySelectorAll('.uc-card').forEach(btn=>{
		btn.addEventListener('click', ()=>{
		  document.querySelectorAll('.uc-card').forEach(b=>b.classList.remove('is-active'));
		  btn.classList.add('is-active');
		  const id = btn.getAttribute('data-uc');
		  const tpl = document.getElementById(`uc-tpl-${id}`);
		  if (tpl) detail.innerHTML = tpl.innerHTML;
		});
	  });
	}


  })();
</script>
