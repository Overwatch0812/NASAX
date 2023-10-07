import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel



def generate_user_recommendations(creator_df, contributors_df, contributor_index, num_recommendations=8):
    # Combine data for freelancers and contributors
    # creator_df["Data"] = creator_df["domain"] + creator_df["level"] + creator_df["type"] + creator_df["project_description"]
    # f_df = creator_df[["Data"]]
    # f1_df = creator_df[["creator_id"]]

    # contributors_df["Data"] = contributors_df["domain"] + contributors_df["level"] + contributors_df["type"] + contributors_df["skills"] + contributors_df["education"]
    # c_df = contributors_df[["Data"]]
    # c1_df = contributors_df[["name"]]

    # def format

    creator_df["Data"] = creator_df["description"]
    f_df = creator_df[["Data"]]
    f1_df = creator_df[["email"]]

    contributors_df["Data"] = contributors_df["full_name"] + contributors_df["domain"] + contributors_df["branch"] + contributors_df["preferred_language"] + contributors_df["level_of_understanding_of_preferred_language"] + contributors_df["university"] + contributors_df["academic_year"]
    c_df = contributors_df[["Data"]]
    c1_df = contributors_df[["full_name"]]

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
    recommendations = f1_df.iloc[creator_indices]
    # print(recommendations)
    result = recommendations['email'].tolist()
    return result

def generate_recommendations(creator_df, contributors_df, creator_index, num_recommendations=8):
    # freelancers_df = pd.read_csv(freelancers_df)
    # contributors_df = pd.read_csv(contributors_df)


    # Combine data for freelancers and contributors
    creator_df["Data"] = creator_df["description"]
    f_df = creator_df[["Data"]]
    # f_df = creator_df[["Data"]]

    

    contributors_df["Data"] = contributors_df["full_name"] + contributors_df["domain"] + contributors_df["branch"] + contributors_df["preferred_language"] + contributors_df["level_of_understanding_of_preferred_language"] + contributors_df["university"] + contributors_df["academic_year"]
    c_df = contributors_df[["Data"]]
    c1_df = contributors_df[["full_name"]]

    # Create a TF-IDF vectorizer
    tfidf_vectorizer = TfidfVectorizer()

    # Fit and transform the data
    creator_profiles = tfidf_vectorizer.fit_transform(f_df['Data'])
    contributor_profiles = tfidf_vectorizer.transform(c_df['Data'])

    # Calculate cosine similarity between project descriptions and contributor skills
    cosine_similarities = linear_kernel(creator_profiles, contributor_profiles)
    # Generate recommendations
    similar_contributors_indices = cosine_similarities[creator_index].argsort()[:-num_recommendations-1:-1]
    recommendations = c1_df.iloc[similar_contributors_indices]
    result = recommendations['full_name'].tolist()

    return result



def get_recommendations(creator_df, contributors_df, id, contributor_index):
    index = None  # Initialize index to None to handle the case where id is not found

    for i in range(len(creator_df) - 1, -1, -1):
        if id == creator_df.at[i, "email"]:
            index = i
            creator_index = index
            recommendations = generate_recommendations(creator_df, contributors_df, creator_index)
            print("If is executed")
            
            return recommendations

    if index is None:
        # contributor_index =   # You can set the contributor_index as needed
        recommendations = generate_user_recommendations(creator_df, contributors_df, contributor_index)
        print("else is executed")
        return recommendations