import pandas as pd
from func import get_recommendations
creator_df = pd.read_csv("creator_data.csv")
contributors_df = pd.read_csv("contributors_data.csv")


email = 'umarbalak35@gmail.com'
suggested_users, suggested_projects = get_recommendations(creator_df, contributors_df, email)


print(suggested_users)
print(suggested_projects)


