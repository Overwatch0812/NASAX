import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.stem.porter import PorterStemmer
from recommend.mlModels.find import find_project
def recommend_projects(f_project_name, csv_file, input_user_id, input_user_domain):
    try:
        # Load the CSV data into a Pandas DataFrame
        data = pd.read_csv(csv_file)

        def con_word(val):
            val = val.replace("'", "").replace(" ", "").replace("-", "").replace("/", "")
            return val.replace("]", "").replace("[", "").split(",")

        data["Skills_Required"] = data["Skills_Required"].apply(con_word)
        data["Skills"] = data["Skills"].apply(con_word)

        def con_id(val):
            val = val.replace("_", "")
            return val

        data["Project_ID"] = data["Project_ID"].apply(con_id)
        data["User_ID"] = data["User_ID"].apply(con_id)

        def rm_space(val):
            val = val.replace(" ", "")
            return val

        data["Category"] = data["Category"].apply(rm_space)

        def rm_spacee(val):
            if isinstance(val, str):
                val = val.replace(" ", "")
            return val

        data["University"] = data["University"].apply(rm_spacee)
        data["User_Domain"] = data["User_Domain"].apply(rm_space)

        def strr(val):
            val = str(val)
            return val

        data["Academic_Year"] = data["Academic_Year"].apply(strr)

        def listt(val):
            val = [val]
            return val

        data["User_Domain"] = data["User_Domain"].apply(listt)
        data["Category"] = data["Category"].apply(listt)
        data["University"] = data["University"].apply(listt)
        data["Experience_Level"] = data["Experience_Level"].apply(listt)
        data["Academic_Year"] = data["Academic_Year"].apply(listt)

        data["Data"] = data["Category"] + data["Skills_Required"] + data["User_Domain"] + data["Experience_Level"] + data["Skills"] + data["University"]

        new_df = data[["Project_ID", "User_ID", "Project_Name", "Data"]]

        new_df = new_df.copy()
        new_df["Data"] = new_df["Data"].apply(lambda x: " ".join(str(item) for item in x))
        new_df["Data"] = new_df["Data"].str.lower()

        ps = PorterStemmer()

        def stem(val):
            y = []
            for i in val.split():
                y.append(ps.stem(i))
            return " ".join(y)

        new_df.loc[:, 'Data'] = new_df['Data'].apply(stem)

        cv = CountVectorizer(max_features=5000, stop_words='english')
        vectors = cv.fit_transform(new_df['Data']).toarray()

        similarity = cosine_similarity(vectors)

        def recommend(project):
            project_index = new_df[new_df['Project_Name'] == project].index[0]
            distances = similarity[project_index]
            if project_index > 10:
                project_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:11]
            else:
                project_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:project_index-1]
            recommendations = []
            for i in project_list:
                project_id = new_df.iloc[i[0]].Project_ID
                project_name = new_df.iloc[i[0]].Project_Name
                category = data.iloc[i[0]].Category
                recommendations.append((project_id, project_name, category))
            return recommendations

        project_recommendations = recommend(f_project_name)

        if project_recommendations:
            print("Recommendations:")
            for project_id, project_name, category in project_recommendations:
                print(f'Project ID: {project_id}, Project Name: {project_name}, Category: {category}')
        else:
            print('No recommendations found.')

    except FileNotFoundError:
        print(f"Error: File '{csv_file}' not found.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")


