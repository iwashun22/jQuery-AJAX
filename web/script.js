const trashIcon = `<i class="fas fa-trash"></i>`;

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
            $tableList.append(`
               <tr>
                  <td>${task.title}</td>
                  <td>${task.due}</td>
                  <td><button class="remove"><i class="fas fa-trash"></i></button></td>
               </tr>
            `);
         })
      },
      error: function() {
         alert('Error loading data');
      }
   })

   $submit.on('click', function() {
      console.log('hi')
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
               $tableList.append(`
               <tr>
                  <td>${newTask.title}</td>
                  <td>${newTask.due}</td>
                  <td><button class="remove"><i class="fas fa-trash"></i></button></td>
               </tr>
            `);
            }
         });
         console.log('hi');
      }
      else {
         alert(`Don't leave the form empty...`);
      }
   })
})