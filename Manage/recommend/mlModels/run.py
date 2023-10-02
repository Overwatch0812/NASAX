from find import find_project
from recom import recommend_projects
data_file = 'project_data.csv'
input_user_id = 'U_75'
input_user_domain = 'Android'
project_id, project_name = find_project(data_file, input_user_id, input_user_domain)
recommendation_function = recommend_projects(data_file)
if recommendation_function:
        project_recommendations = recommendation_function(project_name)
        if project_recommendations:
            print("Recommendations:")
            for project_id, project_name, category in project_recommendations:
                print(f'Project ID: {project_id}, Project Name: {project_name}, Category: {category}')
        else:
            print('No recommendations found.')
else:
        print('Function initialization failed.')
