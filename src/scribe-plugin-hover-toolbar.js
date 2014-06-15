define(function(){

  'use strict';

  return function(toolbarElement){

    return function(scribe){
      //scribe.el.addEventListener('mouseup', function(event){ selectionOn(falseOrEvent(event,toolbarIsClicked)); });
      scribe.el.addEventListener('mouseup', selectionOn);
      scribe.el.addEventListener('focusout', selectionOff);

      function toolbarIsClicked(){
        var selectionRect = selectedElement().getBoundingClientRect(),
            toolbarRect = toolbarElement.getBoundingClientRect();

        showToolbar(selectedElement());
        return true;
      }

      function falseOrEvent(event,predicate){
        if(predicate()){
          return false;
        } else {
          return event;
        }
      }

      function selectedElement(){
        var selection = new scribe.api.Selection()
        var selectedElement = selection.getContaining(function(element){ return element.nodeName !== "#text"; });
        return selectedElement;
      }

      function selectionOn(event){
        console.log(event.target);
        if(event === false){
          return;
        }

        var selection = new scribe.api.Selection();
        // Only react if we actually select some text (a range)
        if(selectedElement() && ((selection.range.endOffset - selection.range.startOffset) > 0)){

          scribe.transactionManager.run(function(){
            showToolbar(selectedElement());
          })
        } else {
          selectionOff(event);
        }

      }

      function selectionOff(event){
        scribe.transactionManager.run(function(){
          hideToolbar();
        })
      }

      function showToolbar(element){
        var rect = element.getBoundingClientRect();

        toolbarElement.parentNode.style.position = "relative";

        toolbarElement.style.position = "absolute";
        toolbarElement.style.top = rect.top-rect.height*2 + "px";
        toolbarElement.style.left = rect.left + "px";
        toolbarElement.style.display = "block";
      }

      function hideToolbar(){
        toolbarElement.style.display = "none";
      }
    }
  }
});
