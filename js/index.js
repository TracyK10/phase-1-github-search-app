document.addEventListener('DOMContentLoaded', () => {
    const submit = document.querySelector('input[name = "submit"]')
    submit.addEventListener('click', e => {
        e.preventDefault();

        fetch('https://api.github.com/search/users?q={query}{&page,per_page,sort,order}', {
            method: 'GET',
            headers: {
                Accept: application/vnd.github.v3+json
            }
        })
        .then(res => res.json())
        .then(data => {
            const repos = document.querySelector('#repos-list')
            let li = document.createElement('li')
            li.textContent = data
            repos.appendChild(li)
            
            // Add a click event to each list item that will display the user's repositories when clicked
            li.addEventListener("click", (e) => {
                if (!li.classList.contains('active')){ 
                    // Remove active class from any currently active items
                    document.querySelectorAll('.user-info').forEach((el) => el.classList.remove('active'));
                    
                    // Add active class to the selected item and display its repo info
                    li.classList.add('active');
                    showRepos(li);
                
                
        }})
        
        function showRepos(item){
            const username = item.dataset.username;
            const repoName = `https://api.github.com/users/${username}/repos`;
            console.log(reponame);
            const repoInfo = document.querySelector(".repo-info");
            
            // Get repos for the selected user and add them to the page
            fetch(repoName)
            .then(response => response.json())
            .then(function(data) {
              // Empty the repoInfo div so we can fill it with new content
              while (repoInfo.firstChild) {
                repoInfo.removeChild(repoInfo.firstChild);
              };
              
              // Create a ul element to hold all of our repo cards
              var repoUl = document.createElement('ul');
              repoUl.className = "repo-cards";
              
              // For each repo, create a card and add it to our ul
              for (var i=0;i<data.length;i++) {    
                var repoCard = buildRepoCard(data[i]);
                repoUl.appendChild(repoCard);
              }
              
              // Append the UL to our repoInfo div
              repoInfo.appendChild(repoUl);
          });
        }
        })
    })
})