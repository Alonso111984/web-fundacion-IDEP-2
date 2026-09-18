/* =====================================================================
   IDEP · Comportamiento compartido por todas las páginas.
   Menú desplegable, año del pie y formulario de contacto.
   ===================================================================== */
(function(){
  'use strict';

  function seguro(fn, nombre){
    try{ fn(); }catch(e){
      if(window.console && console.warn){ console.warn('Fallo en ' + nombre, e); }
    }
  }

  /* ---------- Menú desplegable ---------- */
  seguro(function(){
    var btn    = document.getElementById('btnMenu');
    var panel  = document.getElementById('panel');
    var velo   = document.getElementById('velo');
    var cerrar = document.getElementById('btnCerrar');
    if(!btn || !panel || !velo || !cerrar){ return; }

    var ultimoFoco = null;

    function abrir(){
      ultimoFoco = document.activeElement;
      panel.classList.add('on');
      velo.classList.add('on');
      btn.classList.add('abierto');
      btn.setAttribute('aria-expanded','true');
      btn.setAttribute('aria-label','Cerrar menú');
      document.body.style.overflow = 'hidden';
      cerrar.focus();
    }

    function cerrarMenu(){
      panel.classList.remove('on');
      velo.classList.remove('on');
      btn.classList.remove('abierto');
      btn.setAttribute('aria-expanded','false');
      btn.setAttribute('aria-label','Abrir menú');
      document.body.style.overflow = '';
      if(ultimoFoco && ultimoFoco.focus){ ultimoFoco.focus(); }
    }

    function estaAbierto(){ return panel.classList.contains('on'); }

    btn.addEventListener('click', function(){
      estaAbierto() ? cerrarMenu() : abrir();
    });
    cerrar.addEventListener('click', cerrarMenu);

    /* Tocar fuera del panel lo cierra */
    velo.addEventListener('click', cerrarMenu);

    /* Tecla Escape */
    document.addEventListener('keydown', function(e){
      if((e.key === 'Escape' || e.key === 'Esc') && estaAbierto()){ cerrarMenu(); }
    });

    /* Al elegir una sección, se cierra */
    panel.addEventListener('click', function(e){
      var enlace = e.target.closest ? e.target.closest('a') : null;
      if(enlace){ cerrarMenu(); }
    });

    /* El foco no se escapa del panel mientras está abierto */
    panel.addEventListener('keydown', function(e){
      if(e.key !== 'Tab' || !estaAbierto()){ return; }
      var foco = panel.querySelectorAll('a[href], button:not([disabled])');
      if(!foco.length){ return; }
      var primero = foco[0], ultimo = foco[foco.length - 1];
      if(e.shiftKey && document.activeElement === primero){
        e.preventDefault(); ultimo.focus();
      }else if(!e.shiftKey && document.activeElement === ultimo){
        e.preventDefault(); primero.focus();
      }
    });
  }, 'menu');

  /* ---------- Año del pie ---------- */
  seguro(function(){
    var el = document.getElementById('anio');
    if(el){ el.textContent = new Date().getFullYear(); }
  }, 'anio');

  /* El formulario de contacto vive en assets/formulario.js,
     que solo se carga en contacto.html. */
})();
