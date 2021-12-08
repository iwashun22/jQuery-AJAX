const removeIcon = `<i class="fas fa-trash"></i>`;

$(function() {
   const $tableList = $('.list tbody');
   const $form = $('#task-form');
   const $taskTitle = $('#task-title');
   const $taskStatus = $('#task-status');
   const $submit = $('#submit');

   $.ajax({
      type: 'GET',
      url: '/tasks-api',
      success: function(tasks) {
         $tableList.children().remove();
         $.each(tasks, (i, task) => {
            addToList($tableList, task);
            addRemoveBtn();
         })
      },
      error: function() {
         alert('Error loading data');
      }
   })

   $submit.on('click', function() {
      if($taskTitle.val() && $taskStatus.val()){
         const task = { 
            title: $taskTitle.val(), 
            due: $taskStatus.val() 
         };
         $.ajax({
            type: 'POST',
            url: '/tasks-api',
            data: task,
            success: function(newTask) {
               addToList($tableList, newTask);
               addRemoveBtn();
            },
            error: function() {
               alert('Error sending data...');
            }
         });
         console.log('add task');
      }
      else {
         alert(`Don't leave the form empty...`);
      }

      $taskTitle.val('');
      $taskStatus.val('');
   });
})

/**
 * 
 * @param {HTMLElement} table
 * @param {{title: String, due: String}} task Add task to the list table
 */
function addToList(table, task) {
   table.append(`
      <tr>
         <td>${task.title}</td>
         <td>${task.due}</td>
         <td><button class="remove">${removeIcon}</button></td>
      </tr>
   `);
}

function addRemoveBtn() {
   const $btn = $('button.remove');
   $btn.off('click');
   $btn.on('click', function() {
      const index = $(this).parent().parent().index();
      $.ajax({
         type: 'DELETE',
         url: `/tasks-api/${index}`,
         success: function() {
            $(`.list tbody tr`).eq(index).remove();
            console.log('Deleted task');
         },
         error: function() {
            alert('Can not find data to delete or something went wrong...');
         }
      });
   });
}