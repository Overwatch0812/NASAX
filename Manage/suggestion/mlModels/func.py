import pandas as pd
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

# print(len(creator_df))

def generate_user_recommendations(creator_df, contributors_df, contributor_index, num_recommendations=8):
    # Combine data for freelancers and contributors
    creator_df["Data"] = creator_df["domain"] + creator_df["level_of_expertise_of_collaborator"] + creator_df["type_of_collaborator"] + creator_df["description"]
    f_df = creator_df[["Data"]]
    output_data = creator_df["email"] + creator_df["description"] + creator_df["domain"]

    contributors_df["Data"] = contributors_df["domain"] + contributors_df["level_of_understanding_of_preferred_language"] + contributors_df["preferred_language"]
    c_df = contributors_df[["Data"]]
    # c1_df = contributors_df[["name"]]

    # Create a TF-IDF vectorizer
    tfidf_vectorizer = TfidfVectorizer()

    # Fit and transform the data
    creator_profiles = tfidf_vectorizer.fit_transform(f_df['Data'])
    contributor_profiles = tfidf_vectorizer.transform(c_df['Data'])

    # Calculate cosine similarity between contributor skills and project descriptions of all freelancers
    cosine_similarities = linear_kernel(contributor_profiles, creator_profiles)
    # print(cosine_similarities)
    # Generate recommendations
    creator_indices = cosine_similarities[contributor_index].argsort()[:-num_recommendations-1:-1]
    recommendations = creator_df.iloc[creator_indices]
    # print(recommendations)

    # Convert DataFrame rows to JSON objects
    json_objects1 = recommendations.to_json(orient='records')
    json_objects_1 = json.loads(json_objects1)
    # Print the JSON objects
    # print(json_objects)

    return json_objects_1

def generate_recommendations(creator_df, contributors_df, creator_index, num_recommendations=8):
    # freelancers_df = pd.read_csv(freelancers_df)
    # contributors_df = pd.read_csv(contributors_df)


    # Combine data for freelancers and contributors
    creator_df["Data"] = creator_df["domain"] + creator_df["level_of_expertise_of_collaborator"] + creator_df["type_of_collaborator"] + creator_df["description"]
    f_df = creator_df[["Data"]]

    

    contributors_df["Data"] = contributors_df["domain"] + contributors_df["level_of_understanding_of_preferred_language"] + contributors_df["preferred_language"]
    c_df = contributors_df[["Data"]]
    # c1_df = contributors_df[["name"]]

    # Create a TF-IDF vectorizer
    tfidf_vectorizer = TfidfVectorizer()

    # Fit and transform the data
    creator_profiles = tfidf_vectorizer.fit_transform(f_df['Data'])
    contributor_profiles = tfidf_vectorizer.transform(c_df['Data'])

    # Calculate cosine similarity between project descriptions and contributor skills
    cosine_similarities = linear_kernel(creator_profiles, contributor_profiles)
    # Generate recommendations
    similar_contributors_indices = cosine_similarities[creator_index].argsort()[:-num_recommendations-1:-1]
    recommendations = contributors_df.iloc[similar_contributors_indices]
    # print(recommendations)
    # result = recommendations['name'].tolist()
    json_objects2 = recommendations.to_json(orient='records')
    json_objects_2 = json.loads(json_objects2)
    return json_objects_2



def get_recommendations(creator_df, contributors_df, email,id):
    index = None  # Initialize index to None to handle the case where id is not found

    for i in range(len(creator_df) - 1, -1, -1):
        if email == creator_df.at[i, "email"]:
            index = i
            creator_index = index
            recommended_users = generate_recommendations(creator_df, contributors_df, creator_index)
            # return recommendations_0
            # print(recommendations_0)
        
    if index is None:
                # for i in range(len(creator_df) - 1, -1, -1):
                #     domain = creator_df.at[i, "id"]
                #     print(domain)
                    # index = i
                    # creator_index = index
                    # recommendations_0 = generate_recommendations(creator_df, contributors_df, creator_index)
            creator_index = 0
            recommended_users = generate_recommendations(creator_df, contributors_df, creator_index)
            # print(recommended_users)


    contributor_index = id # You can set the contributor_index as needed
    recommended_projects = generate_user_recommendations(creator_df, contributors_df, contributor_index)
    # print(recommendations_1)
    return recommended_users, recommended_projects